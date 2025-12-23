import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { db } from './db.js';
import { sql, eq, desc } from 'drizzle-orm';

console.log('--- BAZZTECH BACKEND STARTUP ---');
console.log('Time:', new Date().toISOString());
console.log('Port:', process.env.PORT || 3000);

console.log('[server] 1. Starting initialization...');
const app = express();
app.use(express.json());

console.log('[server] 2. Configuring CORS...');
app.use(cors({
  origin: true,
  credentials: true,
}));

console.log('[server] 3. Adding routes...');
app.get('/', (req, res) => {
  console.log('[server] GET / hit');
  res.send('Bazztech API is running');
});

app.get("/health", async (req, res) => {
  console.log('[server] GET /health hit');
  try {
    await db.execute(sql`SELECT 1`);
    res.status(200).send("OK");
  } catch (err) {
    console.error("[server] Health check failed:", err);
    res.status(500).send("DB Error");
  }
});

console.log('[server] 4. Adding tRPC middleware...');
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

// REST endpoint for n8n/leads
app.get("/api/leads", async (req, res) => {
  try {
    const { status } = req.query;
    const { leads } = await import('./schema.js');
    let query = db.select().from(leads);
    if (status) {
      query = query.where(eq(leads.status, status as any));
    }
    const result = await query.orderBy(desc(leads.createdAt));
    res.json(result);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
});

app.post("/api/leads/create", async (req, res) => {
  try {
    const { customerName, phone, email, source, tag, connectionType, installationTown, deliveryLocation, status } = req.body;
    const { leads } = await import('./schema.js');
    await db.insert(leads).values({
      customerName,
      phone,
      email,
      status: status || 'new',
      preferredPackage: connectionType,
      source: source || 'direct',
      tag: tag || 'lead',
      installationTown,
      deliveryLocation,
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

app.post("/api/leads/update", async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const { leads } = await import('./schema.js');
    await db.update(leads).set(data).where(eq(leads.id, id));
    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/leads/update error:", err);
    res.status(500).json({ error: "Failed to update lead" });
  }
});

app.post("/api/submissions/create", async (req, res) => {
  try {
    const { submissions } = await import('./schema.js');
    await db.insert(submissions).values(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/submissions/create error:", err);
    res.status(500).json({ error: "Failed to create submission" });
  }
});

app.post("/api/submit-to-airtel-form", async (req, res) => {
  try {
    const { submitToAirtelForm } = await import('./form-filler.js');
    const result = await submitToAirtelForm(req.body);
    res.json(result);
  } catch (err) {
    console.error("POST /api/submit-to-airtel-form error:", err);
    res.status(500).json({ error: "Form submission failed" });
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

const port = Number(process.env.PORT) || 3000;
console.log(`[server] 6. Attempting to listen on 0.0.0.0:${port}...`);

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`[server] 7. Listening on 0.0.0.0:${port}`);
  console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
  console.error('[server] Server error:', err);
});

// Database connection check on startup (async)
(async () => {
  console.log('[server] 5. Starting DB check...');
  try {
    await db.execute(sql`SELECT 1`);
    console.log('[server] Database connection successful');
  } catch (err) {
    console.error('[server] Database connection failed on startup:', err);
  }
})();

// Error handlers
process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);
});

// Shutdown handlers
const shutdown = () => {
  console.log('[server] Shutting down...');
  server.close(() => {
    console.log('[server] Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
