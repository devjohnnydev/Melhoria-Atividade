import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.teams.list.path, async (req, res) => {
    try {
      const teamsList = await storage.getTeams();
      res.json(teamsList);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.teams.get.path, async (req, res) => {
    try {
      const team = await storage.getTeam(Number(req.params.id));
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      res.json(team);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.teams.create.path, async (req, res) => {
    try {
      const input = api.teams.create.input.parse(req.body);
      const team = await storage.createTeam(input);
      res.status(201).json(team);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch(api.teams.updatePhase.path, async (req, res) => {
    try {
      const input = api.teams.updatePhase.input.parse(req.body);
      const team = await storage.updateTeamPhase(Number(req.params.id), input.phase);
      
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }
      
      res.json(team);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Call seed function at startup
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingTeams = await storage.getTeams();
  if (existingTeams.length === 0) {
    await storage.createTeam({ 
      name: "Equipe Alfa", 
      designerName: "João", 
      clientName: "Maria" 
    });
    await storage.createTeam({ 
      name: "Os Inovadores", 
      designerName: "Lucas", 
      clientName: "Pedro" 
    });
    await storage.createTeam({ 
      name: "Design Total", 
      designerName: "Ana", 
      clientName: "Carla" 
    });
    
    // Simulate some progress
    await storage.updateTeamPhase(1, 2); // Equipe Alfa na fase 2
    await storage.updateTeamPhase(2, 4); // Os Inovadores na fase 4
  }
}
