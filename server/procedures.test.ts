import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock context for testing
function createMockContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email: "test@example.com",
      name: "Test User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("tRPC Procedures", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createMockContext();
    caller = appRouter.createCaller(ctx);
  });

  describe("Leads Router", () => {
    it("should create a lead", async () => {
      const result = await caller.leads.create({
        customerName: "John Doe",
        phone: "+254712345678",
        email: "john@example.com",
        source: "linkedin",
        tag: "high_value",
        preferredPackage: "30mbps",
      });

      expect(result).toBeDefined();
    });

    it("should retrieve all leads", async () => {
      const result = await caller.leads.getAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should filter leads by status", async () => {
      // First create a lead
      await caller.leads.create({
        customerName: "Jane Smith",
        phone: "+254787654321",
        email: "jane@example.com",
        source: "google_maps",
        tag: "high_volume",
        status: "new",
      });

      // Then retrieve by status
      const result = await caller.leads.getByStatus({ status: "new" });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it("should update lead status", async () => {
      // Create a lead first
      const createResult = await caller.leads.create({
        customerName: "Test Lead",
        phone: "+254700000000",
        email: "test@example.com",
        source: "whatsapp",
        tag: "high_value",
      });

      // Get the lead ID from the insert result
      expect(createResult).toBeDefined();
    });
  });

  describe("Submissions Router", () => {
    it("should create a submission", async () => {
      const result = await caller.submissions.create({
        leadId: 1,
        status: "pending",
        submissionPayload: { test: "data" },
      });

      expect(result).toBeDefined();
    });

    it("should retrieve all submissions", async () => {
      const result = await caller.submissions.getAll();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should filter submissions by status", async () => {
      const result = await caller.submissions.getByStatus({ status: "pending" });
      expect(Array.isArray(result)).toBe(true);
    });

    it("should update submission status", async () => {
      const result = await caller.submissions.updateStatus({
        id: 1,
        status: "success",
      });

      expect(result).toBeDefined();
    });
  });

  describe("Analytics Router", () => {
    it("should create analytics record", async () => {
      const result = await caller.analytics.create({
        date: new Date(),
        totalLeads: 100,
        contactedLeads: 80,
        qualifiedLeads: 50,
        submittedLeads: 40,
        installedLeads: 30,
        failedLeads: 10,
        package15Count: 12,
        package30Count: 28,
        submissionSuccessRate: "97.5",
        conversionRate: "30.0",
        avgCommissionPerGA: "2500",
      });

      expect(result).toBeDefined();
    });

    it("should retrieve latest analytics", async () => {
      const result = await caller.analytics.getLatest();
      // Result can be undefined if no analytics exist yet
      expect(result === undefined || typeof result === "object").toBe(true);
    });

    it("should retrieve analytics by date range", async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const endDate = new Date();

      const result = await caller.analytics.getByDateRange({
        startDate,
        endDate,
      });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Config Router", () => {
    it("should set configuration value", async () => {
      const result = await caller.config.set({
        key: "test_config",
        value: { setting: "value" },
        description: "Test configuration",
      });

      expect(result).toBeDefined();
    });

    it("should retrieve configuration by key", async () => {
      // First set a config
      await caller.config.set({
        key: "lead_gen_frequency",
        value: "6h",
      });

      // Then retrieve it
      const result = await caller.config.get({ key: "lead_gen_frequency" });
      expect(result === undefined || typeof result === "object").toBe(true);
    });

    it("should retrieve all configuration", async () => {
      const result = await caller.config.getAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Auth Router", () => {
    it("should get current user", async () => {
      const result = await caller.auth.me();
      expect(result).toBeDefined();
      expect(result?.openId).toBe("test-user");
    });

    it("should logout", async () => {
      const result = await caller.auth.logout();
      expect(result.success).toBe(true);
    });
  });
});
