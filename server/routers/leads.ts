import { router, publicProcedure } from '../trpc';
import { db } from '../db';
import { leads } from '../schema';
import { desc } from 'drizzle-orm';

export const leadsRouter = router({
    getAll: publicProcedure.query(async () => {
        return await db.select().from(leads).orderBy(desc(leads.createdAt));
    }),
});
