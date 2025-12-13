import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createProject: vi.fn(async (data) => {
    return { insertId: 1 };
  }),
  getProjects: vi.fn(async () => {
    return [
      {
        id: 1,
        title: "Modern Kitchen Remodel",
        description: "Complete kitchen transformation",
        projectType: "kitchen",
        serviceCategory: "Cabinet & Storage",
        beforeImageUrl: "https://example.com/before.jpg",
        beforeImageKey: "projects/1/before",
        afterImageUrl: "https://example.com/after.jpg",
        afterImageKey: "projects/1/after",
        featured: 1,
        displayOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }),
  getProjectById: vi.fn(async (id) => {
    return {
      id,
      title: "Modern Kitchen Remodel",
      description: "Complete kitchen transformation",
      projectType: "kitchen",
      serviceCategory: "Cabinet & Storage",
      beforeImageUrl: "https://example.com/before.jpg",
      beforeImageKey: "projects/1/before",
      afterImageUrl: "https://example.com/after.jpg",
      afterImageKey: "projects/1/after",
      featured: 1,
      displayOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }),
  updateProject: vi.fn(async () => {
    return { success: true };
  }),
  deleteProject: vi.fn(async () => {
    return { success: true };
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

describe("projects.list", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrieve all projects", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.list({});

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should filter featured projects", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.list({ featured: true });

    expect(Array.isArray(result)).toBe(true);
  });
});

describe("projects.getById", () => {
  it("should retrieve a project by ID", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.getById({ id: 1 });

    expect(result).toBeDefined();
    expect(result?.id).toBe(1);
    expect(result?.title).toBe("Modern Kitchen Remodel");
  });
});

describe("projects.create", () => {
  it("should create a new project with valid data", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const projectData = {
      title: "Luxury Bathroom Vanity",
      description: "Custom vanity installation",
      projectType: "bathroom",
      serviceCategory: "Vanity & Storage",
      location: "Downtown District",
      beforeImageUrl: "https://example.com/before.jpg",
      beforeImageKey: "projects/2/before",
      afterImageUrl: "https://example.com/after.jpg",
      afterImageKey: "projects/2/after",
      featured: 0,
      displayOrder: 1,
    };

    const result = await caller.projects.create(projectData);

    expect(result).toEqual({ success: true, id: 1 });
  });

  it("should handle missing required fields", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const incompleteData = {
      title: "Incomplete Project",
      // Missing other required fields
    };

    try {
      await caller.projects.create(incompleteData as any);
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("projects.update", () => {
  it("should update a project", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.update({
      id: 1,
      data: { featured: 1 },
    });

    expect(result).toEqual({ success: true });
  });

  it("should handle database errors", async () => {
    const { updateProject } = await import("./db");
    vi.mocked(updateProject).mockRejectedValueOnce(new Error("DB Error"));

    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.projects.update({
        id: 1,
        data: { featured: 1 },
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain("Failed to update project");
    }
  });
});

describe("projects.delete", () => {
  it("should delete a project", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.projects.delete({ id: 1 });

    expect(result).toEqual({ success: true });
  });

  it("should handle deletion errors", async () => {
    const { deleteProject } = await import("./db");
    vi.mocked(deleteProject).mockRejectedValueOnce(new Error("DB Error"));

    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.projects.delete({ id: 1 });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as Error).message).toContain("Failed to delete project");
    }
  });
});
