import { router, publicProcedure } from '../trpc.js';
import { db } from '../db.js';
import { leads } from '../schema.js';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

export const leadsRouter = router({
    getAll: publicProcedure.query(async () => {
        return await db.select().from(leads).orderBy(desc(leads.createdAt));
    }),
    create: publicProcedure
        .input(z.object({
            customerName: z.string(),
            phone: z.string(),
            email: z.string().optional(),
            source: z.string(),
            tag: z.string(),
            connectionType: z.string(),
            installationTown: z.string().optional(),
            deliveryLocation: z.string().optional(),
            status: z.string()
        }))
        .mutation(async ({ input }) => {
            try {
                await db.insert(leads).values({
                    customerName: input.customerName,
                    phoneNumber: input.phone,
                    status: input.status,
                    preferredPackage: input.connectionType,
                    source: input.source,
                    tag: input.tag,
                    conversationHistory: JSON.stringify([
                        {
                            type: "submission",
                            data: {
                                email: input.email,
                                installationTown: input.installationTown,
                                deliveryLocation: input.deliveryLocation,
                            },
                        },
                    ]),
                });
                return { success: true };
            } catch (err) {
                console.error("tRPC leads.create error:", err);
                throw new Error("Failed to save lead");
            }
        }),
});
