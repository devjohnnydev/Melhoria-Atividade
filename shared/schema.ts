import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  techLeadName: text("tech_lead_name").notNull(),
  productOwnerName: text("product_owner_name").notNull(),
  currentPhase: integer("current_phase").notNull().default(1),
});

export const insertTeamSchema = createInsertSchema(teams).omit({ 
  id: true,
  currentPhase: true
});

export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type CreateTeamRequest = InsertTeam;
export type UpdatePhaseRequest = { phase: number };
export type TeamResponse = Team;
export type TeamsListResponse = Team[];
