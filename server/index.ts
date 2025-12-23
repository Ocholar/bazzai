console.log('Server process started');
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers/index.js';

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

const port = Number(process.env.PORT) || 3000;
console.log(`Attempting to start server on port ${port}...`);
try {
    app.listen(port, () => {
        console.log(`Server successfully running on port ${port}`);
        console.log(`Health check available at /health`);
    });
} catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
}
