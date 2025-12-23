process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

console.log('Server process started');
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';
import { sql } from 'drizzle-orm';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://bazztech.co.ke', 'https://ocholar.github.io'],
    credentials: true,
}));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(
    '/api/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext: () => ({}),
    })
);

// OAuth callback endpoint (mock)
app.get('/api/oauth/callback', (req, res) => {
    // Mock setting cookie
    res.cookie('auth_token', 'mock-token', {
        httpOnly: false, // Allow JS access for now as per AuthContext logic
        secure: true,
        sameSite: 'none',
    });

    // Redirect to production dashboard
    const frontendUrl = process.env.FRONTEND_URL || 'https://bazztech.co.ke';
    res.redirect(`${frontendUrl}/dashboard`);
});

import { db } from './db.js';

const port = process.env.PORT || 3000;
console.log(`Attempting to start server on port ${port}...`);
try {
    app.listen(port, '0.0.0.0', async () => {
        console.log(`Server successfully running on port ${port}`);
        console.log(`Health check available at /health`);

        try {
            console.log('Pinging database...');
            await db.execute(sql`SELECT 1`);
            console.log('Database connection successful');
        } catch (dbError) {
            console.error('Database connection failed:', dbError);
        }
    });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}
