import { Request, Response } from "express";
import { addSkillToUser } from "../../services/skills.service";

export const addUserSkillController = async (req: Request, res: Response) => {
  try {
    const { userId, skillId } = req.body;

    if (!userId || !skillId) {
      return res.status(400).json({ error: "Missing required fields: userId, skillId" });
    }

    const result = await addSkillToUser(userId, skillId);

    res.status(201).json({ success: true, data: result, message: "Skill added to user" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill to user" });
  }
};
