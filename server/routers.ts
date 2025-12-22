import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    create: publicProcedure
      .input(z.object({
        customerName: z.string().optional(),
        phone: z.string(),
        email: z.string().optional(),
        source: z.string(),
        tag: z.enum(["high_value", "high_volume"]),
        status: z.enum(["new", "contacted", "qualified", "submitted", "installed", "failed"]).optional(),
        preferredPackage: z.string().optional(), // Changed from enum to string for flexibility
        connectionType: z.string().optional(), // New field for 5G ODU/IPLU/FTTX/SmartNET
        units: z.number().optional(), // New field for quantity
        installationTown: z.string().optional(),
        deliveryLocation: z.string().optional(),
        preferredDate: z.date().optional(),
        preferredTime: z.string().optional(),
        conversationHistory: z.any().optional(),
      }))
      .mutation(({ input }) => db.createLead(input)),
    getAll: publicProcedure.query(() => db.getAllLeads()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getLeadById(input.id)),
    getByPhone: publicProcedure
      .input(z.object({ phone: z.string() }))
      .query(({ input }) => db.getLeadByPhone(input.phone)),
    getByStatus: publicProcedure
      .input(z.object({ status: z.string() }))
      .query(({ input }) => db.getLeadsByStatus(input.status)),
    updateStatus: publicProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => db.updateLeadStatus(input.id, input.status)),
    updateWithConversation: publicProcedure
      .input(z.object({
        id: z.number(),
        preferredPackage: z.string().optional(),
        deliveryLocation: z.string().optional(),
        preferredDate: z.date().optional(),
        preferredTime: z.string().optional(),
        conversationHistory: z.any().optional(),
        status: z.string().optional(),
      }))
      .mutation(({ input }) => db.updateLeadWithConversation(input.id, input)),
  }),
  submissions: router({
    create: publicProcedure
      .input(z.object({
        leadId: z.number(),
        status: z.enum(["pending", "success", "failed", "retry"]).optional(),
        submissionPayload: z.any().optional(),
        responseCode: z.number().optional(),
        responseBody: z.string().optional(),
        errorMessage: z.string().optional(),
        retryCount: z.number().optional(),
      }))
      .mutation(({ input }) => db.createSubmission(input)),
    getAll: publicProcedure.query(() => db.getAllSubmissions()),
    getByLeadId: publicProcedure
      .input(z.object({ leadId: z.number() }))
      .query(({ input }) => db.getSubmissionByLeadId(input.leadId)),
    getByStatus: publicProcedure
      .input(z.object({ status: z.string() }))
      .query(({ input }) => db.getSubmissionsByStatus(input.status)),
    updateStatus: publicProcedure
      .input(z.object({ id: z.number(), status: z.string() }))
      .mutation(({ input }) => db.updateSubmissionStatus(input.id, input.status)),
  }),
  analytics: router({
    create: publicProcedure
      .input(z.object({
        date: z.date(),
        totalLeads: z.number().optional(),
        contactedLeads: z.number().optional(),
        qualifiedLeads: z.number().optional(),
        submittedLeads: z.number().optional(),
        installedLeads: z.number().optional(),
        failedLeads: z.number().optional(),
        package15Count: z.number().optional(),
        package30Count: z.number().optional(),
        submissionSuccessRate: z.string().optional(),
        conversionRate: z.string().optional(),
        avgCommissionPerGA: z.string().optional(),
      }))
      .mutation(({ input }) => db.createAnalytic(input as any)),
    getLatest: publicProcedure.query(() => db.getLatestAnalytic()),
    getByDateRange: publicProcedure
      .input(z.object({ startDate: z.date(), endDate: z.date() }))
      .query(({ input }) => db.getAnalyticsByDateRange(input.startDate, input.endDate)),
  }),
  config: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(({ input }) => db.getConfigByKey(input.key)),
    getAll: publicProcedure.query(() => db.getAllConfig()),
    set: publicProcedure
      .input(z.object({ key: z.string(), value: z.any(), description: z.string().optional() }))
      .mutation(({ input }) => db.setConfig(input.key, input.value, input.description)),
  }),
});

export type AppRouter = typeof appRouter;
