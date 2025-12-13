import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createJobSubmission, getJobSubmissions, updateJobSubmissionStatus, createProject, getProjects, getProjectById, updateProject, deleteProject, createQuoteRequest, getQuoteRequests, updateQuoteRequestStatus } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
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

  projects: router({
    list: publicProcedure
      .input((data: any) => data)
      .query(async ({ input }) => {
        return getProjects(input?.featured);
      }),
    
    getById: publicProcedure
      .input((data: any) => data)
      .query(async ({ input }) => {
        return getProjectById(input.id);
      }),
    
    create: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          const result = await createProject(input);
          return { success: true, id: (result as any).insertId };
        } catch (error) {
          console.error("Failed to create project:", error);
          throw new Error("Failed to create project");
        }
      }),
    
    update: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          await updateProject(input.id, input.data);
          return { success: true };
        } catch (error) {
          console.error("Failed to update project:", error);
          throw new Error("Failed to update project");
        }
      }),
    
    delete: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          await deleteProject(input.id);
          return { success: true };
        } catch (error) {
          console.error("Failed to delete project:", error);
          throw new Error("Failed to delete project");
        }
      })
  }),

  jobs: router({
    list: publicProcedure
      .input((data: any) => data)
      .query(async ({ input }) => {
        return getJobSubmissions(input?.status);
      }),
    
    create: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          const result = await createJobSubmission(input);
          
          // Notify owner of new submission
          await notifyOwner({
            title: "New Job Submission",
            content: `${input.clientName} submitted a job request.\nContact: ${input.clientEmail || input.clientPhone}\nProject: ${input.projectType}`,
          });
          
          return { success: true, id: (result as any).insertId };
        } catch (error) {
          console.error("Failed to create job submission:", error);
          throw new Error("Failed to create job submission");
        }
      }),
    
    updateStatus: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          await updateJobSubmissionStatus(input.id, input.status);
          return { success: true };
        } catch (error) {
          console.error("Failed to update status:", error);
          throw new Error("Failed to update status");
        }
      })
  }),

  quotes: router({
    list: publicProcedure
      .input((data: any) => data)
      .query(async ({ input }) => {
        return getQuoteRequests(input?.status);
      }),
    
    create: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          const result = await createQuoteRequest({
            clientName: input.clientName,
            clientEmail: input.clientEmail || null,
            clientPhone: input.clientPhone || null,
            projectType: input.projectType,
            selectedServices: JSON.stringify(input.selectedServices),
            status: "new",
          });
          
          // Notify owner of new quote request
          await notifyOwner({
            title: "New Quote Request",
            content: `${input.clientName} requested a quote for ${input.projectType} services.\nContact: ${input.clientEmail || input.clientPhone}\nServices: ${input.selectedServices.join(", ")}`,
          });
          
          return { success: true, id: (result as any).insertId };
        } catch (error) {
          console.error("Failed to create quote request:", error);
          throw new Error("Failed to create quote request");
        }
      }),
    
    updateStatus: publicProcedure
      .input((data: any) => data)
      .mutation(async ({ input }) => {
        try {
          await updateQuoteRequestStatus(input.id, input.status);
          return { success: true };
        } catch (error) {
          console.error("Failed to update status:", error);
          throw new Error("Failed to update status");
        }
      })
  }),
});

export type AppRouter = typeof appRouter;
