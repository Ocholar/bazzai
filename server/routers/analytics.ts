import { router, publicProcedure } from '../trpc.js';
import { db } from '../db.js';
import { leads, submissions } from '../schema.js';
import { count, eq } from 'drizzle-orm';

export const analyticsRouter = router({
    getLatest: publicProcedure.query(async () => {
        const [totalLeadsResult] = await db.select({ count: count() }).from(leads);
        const [totalSubmissionsResult] = await db.select({ count: count() }).from(submissions);
        const [qualifiedLeadsResult] = await db.select({ count: count() }).from(leads).where(eq(leads.status, 'qualified'));

        const totalLeads = totalLeadsResult?.count || 0;
        const totalSubmissions = totalSubmissionsResult?.count || 0;
        const qualifiedLeads = qualifiedLeadsResult?.count || 0;

        const conversionRate = totalLeads > 0 ? (totalSubmissions / totalLeads) * 100 : 0;

        // Revenue calculation (mock logic based on submissions)
        // Assuming avg commission of 1500 per submission
        const revenue = totalSubmissions * 1500;

        return {
            totalLeads,
            conversionRate,
            revenue
        };
    }),
});
