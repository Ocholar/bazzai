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
    await db.execute("SELECT 1");
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

// Database connection check on startup
(async () => {
  try {
    await db.execute(sql`SELECT 1`);
    console.log('[server] Database connection successful');
  } catch (err) {
    console.error('[server] Database connection failed on startup:', err);
  }
})();

const port = process.env.PORT || 3000;
app.listen(Number(port), "0.0.0.0", () => {
  console.log(`[server] Listening on port ${port}`);
  console.log(`[server] Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Error handlers
process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled Rejection:", reason);
});
