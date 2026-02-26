import { z } from 'zod';
import { insertTeamSchema, teams } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  teams: {
    list: {
      method: 'GET' as const,
      path: '/api/teams' as const,
      responses: {
        200: z.array(z.custom<typeof teams.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/teams/:id' as const,
      responses: {
        200: z.custom<typeof teams.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/teams' as const,
      input: insertTeamSchema,
      responses: {
        201: z.custom<typeof teams.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    updatePhase: {
      method: 'PATCH' as const,
      path: '/api/teams/:id/phase' as const,
      input: z.object({ phase: z.number().min(1).max(4) }),
      responses: {
        200: z.custom<typeof teams.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type TeamInput = z.infer<typeof api.teams.create.input>;
export type TeamResponse = z.infer<typeof api.teams.create.responses[201]>;
export type TeamsListResponse = z.infer<typeof api.teams.list.responses[200]>;
