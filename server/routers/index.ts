import { router } from '../trpc.js';
import { leadsRouter } from './leads.js';
import { analyticsRouter } from './analytics.js';
import { submissionsRouter } from './submissions.js';
import { configRouter } from './config.js';

export const appRouter = router({
    leads: leadsRouter,
    analytics: analyticsRouter,
    submissions: submissionsRouter,
    config: configRouter,
});

export type AppRouter = typeof appRouter;
