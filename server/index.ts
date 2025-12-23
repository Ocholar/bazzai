import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { db } from './db.js';
import { sql } from 'drizzle-orm';

console.log('--- BACKEND STARTUP SEQUENCE ---');
console.log('Time:', new Date().toISOString());
console.log('PORT ENV:', process.env.PORT);

const app = express();
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Bazztech API is running');
});

// Robust CORS
app.use(cors({
  origin: true,
  credentials: true,
}));

// Basic health check
app.get('/health', async (req, res) => {
  try {
    await db.execute("SELECT 1");
    res.status(200).send("OK");
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).send("DB Error");
  }
});

// DB health check
app.get('/health/db', async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: String(error) });
  }
});

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

// Legacy REST endpoint for n8n
app.post("/api/leads/create", async (req, res) => {
  try {
    const { customerName, phone, email, source, tag, connectionType, installationTown, deliveryLocation, status } = req.body;
    const { leads } from './schema.js';
    await db.insert(leads).values({
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
  res.cookie('auth_token', 'mock-token', {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  });
  const frontendUrl = process.env.FRONTEND_URL || 'https://bazztech.co.ke';
  res.redirect(`${frontendUrl}/dashboard`);
});

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`[server] Listening on http://0.0.0.0:${port}`);
});

process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);
});
