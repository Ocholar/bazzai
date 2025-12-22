import { router, publicProcedure } from '../trpc';
import { db } from '../db';
import { submissions } from '../schema';
import { desc } from 'drizzle-orm';

export const submissionsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }),
});
