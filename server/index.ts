import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { db } from './db.js';
import { sql } from 'drizzle-orm';

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

// Basic health check that doesn't depend on DB
app.get('/health', (req, res) => {
    console.log('Health check requested');
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// DB health check
app.get('/health/db', async (req, res) => {
    console.log('DB health check requested');
    try {
        await db.execute(sql`SELECT 1`);
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
        createContext: () => ({}),
    })
);

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

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
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
