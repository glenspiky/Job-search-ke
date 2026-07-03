import { Request, Response } from "express";
import { createSkill } from "../../services/skills.service";

export const createSkillController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing required field: name" });
    }

    const skill = await createSkill(name);

    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ error: "Failed to create skill" });
  }
};
