import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, JobSubmission, jobSubmissions, projects, Project, InsertProject, quoteRequests, InsertQuoteRequest, QuoteRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createJobSubmission(data: {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  projectType: string;
  serviceCategory: string;
  projectDescription: string;
  location: string;
  latitude?: string;
  longitude?: string;
  timelinePreference: string;
  budgetRange: string;
  hasElectrical: boolean;
  hasPlumbing: boolean;
  hasGasLines: boolean;
  hasLoadBearing: boolean;
  requiresPermits: boolean;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(jobSubmissions).values({
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    clientPhone: data.clientPhone,
    projectType: data.projectType,
    serviceCategory: data.serviceCategory,
    projectDescription: data.projectDescription,
    location: data.location,
    latitude: data.latitude,
    longitude: data.longitude,
    timelinePreference: data.timelinePreference,
    budgetRange: data.budgetRange,
    hasElectrical: data.hasElectrical ? 1 : 0,
    hasPlumbing: data.hasPlumbing ? 1 : 0,
    hasGasLines: data.hasGasLines ? 1 : 0,
    hasLoadBearing: data.hasLoadBearing ? 1 : 0,
    requiresPermits: data.requiresPermits ? 1 : 0,
    status: "new",
  });

  return result;
}

export async function getJobSubmissions(status?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get submissions: database not available");
    return [];
  }

  if (status) {
    return db.select().from(jobSubmissions).where(eq(jobSubmissions.status, status as any));
  }

  return db.select().from(jobSubmissions);
}

export async function updateJobSubmissionStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db.update(jobSubmissions)
    .set({ status: status as any })
    .where(eq(jobSubmissions.id, id));
}

export async function createProject(data: InsertProject) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(projects).values(data);
  return result;
}

export async function getProjects(featured?: boolean) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get projects: database not available");
    return [];
  }

  if (featured) {
    return db.select().from(projects).where(eq(projects.featured, 1));
  }

  return db.select().from(projects);
}

export async function getProjectById(id: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get project: database not available");
    return undefined;
  }

  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateProject(id: number, data: Partial<InsertProject>) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db.update(projects)
    .set(data)
    .where(eq(projects.id, id));
}

export async function deleteProject(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db.delete(projects).where(eq(projects.id, id));
}

export async function createQuoteRequest(data: InsertQuoteRequest) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const result = await db.insert(quoteRequests).values(data);
  return result;
}

export async function getQuoteRequests(status?: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get quote requests: database not available");
    return [];
  }

  if (status) {
    return db.select().from(quoteRequests).where(eq(quoteRequests.status, status as any));
  }

  return db.select().from(quoteRequests);
}

export async function updateQuoteRequestStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return db.update(quoteRequests)
    .set({ status: status as any })
    .where(eq(quoteRequests.id, id));
}
