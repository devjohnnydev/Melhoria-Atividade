import { db } from "./db";
import {
  teams,
  type CreateTeamRequest,
  type UpdatePhaseRequest,
  type TeamResponse
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getTeams(): Promise<TeamResponse[]>;
  getTeam(id: number): Promise<TeamResponse | undefined>;
  createTeam(team: CreateTeamRequest): Promise<TeamResponse>;
  updateTeamPhase(id: number, phase: number): Promise<TeamResponse>;
}

export class DatabaseStorage implements IStorage {
  async getTeams(): Promise<TeamResponse[]> {
    return await db.select().from(teams);
  }

  async getTeam(id: number): Promise<TeamResponse | undefined> {
    const [team] = await db.select().from(teams).where(eq(teams.id, id));
    return team;
  }

  async createTeam(team: CreateTeamRequest): Promise<TeamResponse> {
    const [created] = await db.insert(teams).values(team).returning();
    return created;
  }

  async updateTeamPhase(id: number, phase: number): Promise<TeamResponse> {
    const [updated] = await db.update(teams)
      .set({ currentPhase: phase })
      .where(eq(teams.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
