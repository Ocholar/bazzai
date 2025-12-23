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
                    phone: input.phone,
                    email: input.email,
                    status: input.status,
                    preferredPackage: input.connectionType,
                    source: input.source,
                    tag: input.tag,
                    installationTown: input.installationTown,
                    deliveryLocation: input.deliveryLocation,
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
    update: publicProcedure
        .input(z.object({
            id: z.number(),
            status: z.string().optional(),
            customerName: z.string().optional(),
            phone: z.string().optional(),
            email: z.string().optional(),
            preferredPackage: z.string().optional(),
            installationTown: z.string().optional(),
            deliveryLocation: z.string().optional(),
            preferredDate: z.date().optional(),
            preferredTime: z.string().optional(),
        }))
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            const { eq } = await import('drizzle-orm');
            await db.update(leads).set(data).where(eq(leads.id, id));
            return { success: true };
        }),
    submitToAirtel: publicProcedure
        .input(z.object({
            id: z.number(),
        }))
        .mutation(async ({ input }) => {
            const { eq } = await import('drizzle-orm');
            const [lead] = await db.select().from(leads).where(eq(leads.id, input.id));
            if (!lead) throw new Error("Lead not found");

            const { submitToAirtelForm } = await import('../form-filler.js');
            const result = await submitToAirtelForm({
                customerName: lead.customerName || "Unknown",
                customerAirtelNumber: lead.phone,
                customerAlternateNumber: lead.phone,
                customerEmail: lead.email || undefined,
                preferredPackage: lead.preferredPackage || "30Mbps",
                installationTown: lead.installationTown || "NAIROBI",
                deliveryLocation: lead.deliveryLocation || undefined,
                connectionType: 'SmartConnect (5G ODU)',
                units: '1'
            });

            if (result.success) {
                await db.update(leads).set({ status: 'submitted' }).where(eq(leads.id, input.id));
                const { submissions } = await import('../schema.js');
                await db.insert(submissions).values({
                    leadId: input.id,
                    status: 'success',
                    responseCode: 200,
                    responseBody: 'Submitted via UI',
                });
            } else {
                const { submissions } = await import('../schema.js');
                await db.insert(submissions).values({
                    leadId: input.id,
                    status: 'failed',
                    errorMessage: result.error,
                });
            }

            return result;
        }),
});
