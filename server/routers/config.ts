import { router, publicProcedure } from '../trpc';
import { db } from '../db';
import { config } from '../schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const configRouter = router({
    getAll: publicProcedure.query(async () => {
        return await db.select().from(config);
    }),
    set: publicProcedure
        .input(z.object({
            key: z.string(),
            value: z.any(),
            description: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
            const existing = await db.select().from(config).where(eq(config.key, input.key));
            if (existing.length > 0) {
                await db.update(config)
                    .set({ value: input.value, description: input.description })
                    .where(eq(config.key, input.key));
            } else {
                await db.insert(config).values({
                    key: input.key,
                    value: input.value,
                    description: input.description,
                });
            }
            return { success: true };
        }),
});
