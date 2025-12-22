import { router, publicProcedure } from '../trpc.js';
import { db } from '../db.js';
import { submissions } from '../schema.js';
import { desc } from 'drizzle-orm';

export const submissionsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }),
});
