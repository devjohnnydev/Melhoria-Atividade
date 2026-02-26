import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type TeamInput } from "@shared/routes";

function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useTeams() {
  return useQuery({
    queryKey: [api.teams.list.path],
    queryFn: async () => {
      const res = await fetch(api.teams.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch teams");
      const data = await res.json();
      return parseWithLogging(api.teams.list.responses[200], data, "teams.list");
    },
  });
}

export function useTeam(id: number) {
  return useQuery({
    queryKey: [api.teams.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.teams.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch team");
      const data = await res.json();
      return parseWithLogging(api.teams.get.responses[200], data, `teams.get(${id})`);
    },
    enabled: !!id,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: TeamInput) => {
      const validated = api.teams.create.input.parse(data);
      const res = await fetch(api.teams.create.path, {
        method: api.teams.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      const json = await res.json();
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.teams.create.responses[400].parse(json);
          throw new Error(error.message);
        }
        throw new Error("Failed to create team");
      }
      return parseWithLogging(api.teams.create.responses[201], json, "teams.create");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.teams.list.path] });
    },
  });
}

export function useUpdateTeamPhase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, phase }: { id: number; phase: number }) => {
      const validated = api.teams.updatePhase.input.parse({ phase });
      const url = buildUrl(api.teams.updatePhase.path, { id });
      const res = await fetch(url, {
        method: api.teams.updatePhase.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Failed to update team phase");
      }
      return parseWithLogging(api.teams.updatePhase.responses[200], json, "teams.updatePhase");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.teams.list.path] });
    },
  });
}
