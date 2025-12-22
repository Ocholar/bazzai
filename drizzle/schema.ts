import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table - stores all acquired leads from various sources
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  customerName: text("customerName"),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  source: varchar("source", { length: 50 }).notNull(), // linkedin, google_maps, whatsapp, facebook
  tag: mysqlEnum("tag", ["high_value", "high_volume"]).notNull(),
  status: mysqlEnum("status", ["new", "contacted", "qualified", "submitted", "installed", "failed"]).default("new").notNull(),
  preferredPackage: mysqlEnum("preferredPackage", ["15mbps", "30mbps", "unspecified"]).default("unspecified"),
  // connectionType: varchar("connectionType", { length: 100 }), // 5G ODU, IPLU, FTTX, SmartNET - COMMENTED OUT until DB migration
  // units: int("units").default(1), // COMMENTED OUT until DB migration
  installationTown: text("installationTown"),
  deliveryLocation: text("deliveryLocation"),
  preferredDate: timestamp("preferredDate"),
  preferredTime: varchar("preferredTime", { length: 20 }),
  conversationHistory: json("conversationHistory"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Submissions table - tracks all form submissions to Airtel
 */
export const submissions = mysqlTable("submissions", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  status: mysqlEnum("status", ["pending", "success", "failed", "retry"]).default("pending").notNull(),
  submissionPayload: json("submissionPayload"),
  responseCode: int("responseCode"),
  responseBody: text("responseBody"),
  errorMessage: text("errorMessage"),
  retryCount: int("retryCount").default(0),
  lastRetryAt: timestamp("lastRetryAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;

/**
 * Analytics table - stores daily performance metrics
 */
export const analytics = mysqlTable("analytics", {
  id: int("id").autoincrement().primaryKey(),
  date: timestamp("date").notNull(),
  totalLeads: int("totalLeads").default(0),
  contactedLeads: int("contactedLeads").default(0),
  qualifiedLeads: int("qualifiedLeads").default(0),
  submittedLeads: int("submittedLeads").default(0),
  installedLeads: int("installedLeads").default(0),
  failedLeads: int("failedLeads").default(0),
  package15Count: int("package15Count").default(0),
  package30Count: int("package30Count").default(0),
  submissionSuccessRate: decimal("submissionSuccessRate", { precision: 5, scale: 2 }).default("0"),
  conversionRate: decimal("conversionRate", { precision: 5, scale: 2 }).default("0"),
  avgCommissionPerGA: decimal("avgCommissionPerGA", { precision: 10, scale: 2 }).default("0"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Analytic = typeof analytics.$inferSelect;
export type InsertAnalytic = typeof analytics.$inferInsert;

/**
 * Configuration table - stores system configuration and settings
 */
export const config = mysqlTable("config", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: json("value"),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Config = typeof config.$inferSelect;
export type InsertConfig = typeof config.$inferInsert;