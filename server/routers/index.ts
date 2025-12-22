import { router } from '../trpc';
import { leadsRouter } from './leads';
import { analyticsRouter } from './analytics';
import { submissionsRouter } from './submissions';

export const appRouter = router({
    leads: leadsRouter,
    analytics: analyticsRouter,
    submissions: submissionsRouter,
});

export type AppRouter = typeof appRouter;
