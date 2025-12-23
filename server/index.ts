import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { inferAsyncReturnType } from '@trpc/server';
import { db } from './db.js';

console.log('--- BACKEND STARTUP SEQUENCE ---');
console.log('Time:', new Date().toISOString());
console.log('Node Version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

const app = express();

// Robust CORS
app.use(cors({
    origin: true, // Allow all origins for debugging, will restrict later
    credentials: true,
}));
app.use(express.json());

// Basic health check that doesn't depend on DB
app.get('/health', async (req, res) => {
    console.log('Health check requested');
    try {
        await db.execute('SELECT 1');
        res.status(200).send('OK');
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(500).send('DB Error');
    }
});

// DB health check
app.get('/health/db', async (req, res) => {
    console.log('DB health check requested');
    try {
        await db.execute('SELECT 1');
        res.json({ status: 'ok', db: 'connected' });
    } catch (error) {
        console.error('DB Health Check Failed:', error);
        res.status(500).json({ status: 'error', message: error instanceof Error ? error.message : String(error) });
    }
});

app.use(
    '/api/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext: (): inferAsyncReturnType<typeof appRouter["_def"]["_ctx"]> => ({}),
        onError({ error, path }) {
            console.error("tRPC error:", { path, error });
        },
    })
);

// Legacy REST endpoint for n8n and direct POSTs
app.post("/api/leads/create", async (req, res) => {
  try {
    const { customerName, phone, email, source, tag, connectionType, installationTown, deliveryLocation, status } = req.body;
    await db.insert("leads").values({
      customerName,
      phoneNumber: phone,
      status,
      preferredPackage: connectionType,
      source,
      tag,
      conversationHistory: JSON.stringify([
        {
          type: "submission",
          data: { email, installationTown, deliveryLocation },
        },
      ]),
    });
    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/leads/create error:", err);
    res.status(500).json({ error: "Failed to save lead" });
  }
});

// OAuth callback
app.get('/api/oauth/callback', (req, res) => {
    console.log('OAuth callback hit');
    res.cookie('auth_token', 'mock-token', {
        httpOnly: false,
        secure: true,
        sameSite: 'none',
    });
    const frontendUrl = process.env.FRONTEND_URL || 'https://bazztech.co.ke';
    res.redirect(`${frontendUrl}/dashboard`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`[server] Listening on http://0.0.0.0:${port}`);
});

// Add error handlers for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);
});
