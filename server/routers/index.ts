import { router } from '../trpc';
import { leadsRouter } from './leads';
import { analyticsRouter } from './analytics';
import { submissionsRouter } from './submissions';
import { configRouter } from './config';

export const appRouter = router({
    leads: leadsRouter,
    analytics: analyticsRouter,
    submissions: submissionsRouter,
    config: configRouter,
});

export type AppRouter = typeof appRouter;
