import { router, publicProcedure } from '../trpc.js';
import { db } from '../db.js';
import { submissions } from '../schema.js';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

export const submissionsRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  }),
  create: publicProcedure
    .input(z.object({
      leadId: z.number(),
      status: z.enum(['pending', 'success', 'failed', 'retry']),
      submissionPayload: z.any().optional(),
      responseCode: z.number().optional(),
      responseBody: z.string().optional(),
      errorMessage: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await db.insert(submissions).values(input);
      return { success: true };
    }),
});
