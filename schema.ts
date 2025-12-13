import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

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

export const jobSubmissions = mysqlTable("jobSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }).notNull(),
  projectType: varchar("projectType", { length: 100 }).notNull(), // "kitchen" or "bathroom"
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(),
  projectDescription: text("projectDescription").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  latitude: varchar("latitude", { length: 50 }),
  longitude: varchar("longitude", { length: 50 }),
  timelinePreference: varchar("timelinePreference", { length: 50 }).notNull(), // "urgent", "soon", "flexible"
  budgetRange: varchar("budgetRange", { length: 50 }).notNull(), // "under_500", "500_1000", "1000_5000", "over_5000"
  hasElectrical: int("hasElectrical").default(0), // 0 = no, 1 = yes
  hasPlumbing: int("hasPlumbing").default(0),
  hasGasLines: int("hasGasLines").default(0),
  hasLoadBearing: int("hasLoadBearing").default(0),
  requiresPermits: int("requiresPermits").default(0),
  status: mysqlEnum("status", ["new", "quoted", "scheduled", "completed", "rejected"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type JobSubmission = typeof jobSubmissions.$inferSelect;
export type InsertJobSubmission = typeof jobSubmissions.$inferInsert;

export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  projectType: varchar("projectType", { length: 50 }).notNull(), // "kitchen" or "bathroom"
  description: text("description").notNull(),
  included: text("included"), // JSON array of included items
  excluded: text("excluded"), // JSON array of excluded items
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

export const pricingRates = mysqlTable("pricingRates", {
  id: int("id").autoincrement().primaryKey(),
  rateType: varchar("rateType", { length: 50 }).notNull(),
  jobType: varchar("jobType", { length: 100 }),
  minRate: int("minRate").notNull(),
  maxRate: int("maxRate").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PricingRate = typeof pricingRates.$inferSelect;
export type InsertPricingRate = typeof pricingRates.$inferInsert;

export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  projectType: varchar("projectType", { length: 50 }).notNull(), // "kitchen" or "bathroom"
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }),
  beforeImageUrl: varchar("beforeImageUrl", { length: 500 }).notNull(),
  beforeImageKey: varchar("beforeImageKey", { length: 255 }).notNull(), // S3 key
  afterImageUrl: varchar("afterImageUrl", { length: 500 }).notNull(),
  afterImageKey: varchar("afterImageKey", { length: 255 }).notNull(), // S3 key
  completionDate: timestamp("completionDate"),
  featured: int("featured").default(0), // 0 = not featured, 1 = featured on homepage
  displayOrder: int("displayOrder").default(0), // For ordering in gallery
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

export const quoteRequests = mysqlTable("quoteRequests", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  clientPhone: varchar("clientPhone", { length: 20 }),
  projectType: varchar("projectType", { length: 50 }).notNull(), // "kitchen" or "bathroom"
  selectedServices: text("selectedServices").notNull(), // JSON array of selected services
  status: mysqlEnum("status", ["new", "quoted", "contacted", "completed"]).default("new").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = typeof quoteRequests.$inferInsert;