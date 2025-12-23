import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { db } from './db.js';
import { sql } from 'drizzle-orm';

console.log('--- BAZZTECH BACKEND STARTUP ---');
console.log('Time:', new Date().toISOString());
console.log('Port:', process.env.PORT || 3000);

const app = express();
app.use(express.json());

// Robust CORS
app.use(cors({
  origin: true, // Allow all for now to debug
  credentials: true,
}));

// Root route
app.get('/', (req, res) => {
  res.send('Bazztech API is running');
});

// Health check with DB ping
app.get("/health", async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.status(200).send("OK");
  } catch (err) {
    console.error("Health check failed:", err);
    res.status(500).send("DB Error");
  }
});

// tRPC Middleware
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

// REST endpoint for n8n/leads
app.post("/api/leads/create", async (req, res) => {
  try {
    const { customerName, phone, email, source, tag, connectionType, installationTown, deliveryLocation, status } = req.body;
    const { leads } = await import('./schema.js');
    await db.insert(leads).values({
      customerName,
      phoneNumber: phone,
      status: status || 'new',
      preferredPackage: connectionType,
      source: source || 'direct',
      tag: tag || 'lead',
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

// OAuth callback (mock)
app.get('/api/oauth/callback', (req, res) => {
  res.cookie('auth_token', 'mock-token', {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  });
  const frontendUrl = process.env.FRONTEND_URL || 'https://bazztech.co.ke';
  res.redirect(`${frontendUrl}/dashboard`);
});

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`[server] Listening on http://0.0.0.0:${port}`);
});

// Error handlers
process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);
});
