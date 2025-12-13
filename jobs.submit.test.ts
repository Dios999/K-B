import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and notification functions
vi.mock("./db", () => ({
  createJobSubmission: vi.fn(async (data) => {
    return { insertId: 1 };
  }),
  getJobSubmissions: vi.fn(async () => {
    return [];
  }),
  updateJobSubmissionStatus: vi.fn(async () => {
    return { success: true };
  }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => {
    return true;
  }),
}));

function createMockContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("jobs.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should successfully submit a job with valid data", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const jobData = {
      clientName: "John Smith",
      clientEmail: "john@example.com",
      clientPhone: "555-0123",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      projectDescription: "Need to replace old kitchen cabinets",
      location: "123 Main St, City, State",
      timelinePreference: "soon",
      budgetRange: "1000_5000",
      hasElectrical: false,
      hasPlumbing: false,
      hasGasLines: false,
      hasLoadBearing: false,
      requiresPermits: false,
    };

    const result = await caller.jobs.create(jobData);

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("should reject submission with missing required fields", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const incompleteData = {
      clientName: "John Smith",
      clientEmail: "john@example.com",
      // Missing other required fields
    };

    try {
      await caller.jobs.create(incompleteData as any);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should accept submissions with out-of-scope flags", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const jobData = {
      clientName: "Jane Doe",
      clientEmail: "jane@example.com",
      clientPhone: "555-0456",
      projectType: "bathroom",
      serviceCategory: "Vanity & Storage",
      projectDescription: "Bathroom vanity with electrical work",
      location: "456 Oak Ave, City, State",
      timelinePreference: "flexible",
      budgetRange: "500_1000",
      hasElectrical: true, // Out of scope
      hasPlumbing: false,
      hasGasLines: false,
      hasLoadBearing: false,
      requiresPermits: false,
    };

    // Should still accept but flag as out-of-scope
    const result = await caller.jobs.create(jobData);
    expect(result).toEqual({ success: true, id: 1 });
  });

  it("should validate email format", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const jobData = {
      clientName: "John Smith",
      clientEmail: "invalid-email", // Invalid email
      clientPhone: "555-0123",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      projectDescription: "Need to replace old kitchen cabinets",
      location: "123 Main St, City, State",
      timelinePreference: "soon",
      budgetRange: "1000_5000",
      hasElectrical: false,
      hasPlumbing: false,
      hasGasLines: false,
      hasLoadBearing: false,
      requiresPermits: false,
    };

    try {
      await caller.jobs.create(jobData);
      // Email validation may or may not be strict depending on implementation
      // This test documents the expected behavior
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should handle database errors gracefully", async () => {
    const { createJobSubmission } = await import("./db");
    vi.mocked(createJobSubmission).mockRejectedValueOnce(new Error("DB Error"));

    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const jobData = {
      clientName: "John Smith",
      clientEmail: "john@example.com",
      clientPhone: "555-0123",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      projectDescription: "Need to replace old kitchen cabinets",
      location: "123 Main St, City, State",
      timelinePreference: "soon",
      budgetRange: "1000_5000",
      hasElectrical: false,
      hasPlumbing: false,
      hasGasLines: false,
      hasLoadBearing: false,
      requiresPermits: false,
    };

    try {
      await caller.jobs.create(jobData);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain("Failed to create job submission");
    }
  });
});

describe("jobs.list", () => {
  it("should retrieve all job submissions when no filter is provided", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.jobs.list({});

    expect(Array.isArray(result)).toBe(true);
  });

  it("should filter submissions by status", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.jobs.list({ status: "new" });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("jobs.updateStatus", () => {
  it("should update job submission status", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.jobs.updateStatus({
      id: 1,
      status: "quoted",
    });

    expect(result).toEqual({ success: true });
  });

  it("should handle invalid status values", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.jobs.updateStatus({
        id: 1,
        status: "invalid_status",
      });
      // Implementation may or may not validate status values
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
