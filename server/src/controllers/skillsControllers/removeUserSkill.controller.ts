import { Request, Response } from "express";
import { removeSkillFromUser } from "../../services/skills.service";

export const removeUserSkillController = async (req: Request, res: Response) => {
  try {
    const { userId, skillId } = req.body;

    if (!userId || !skillId) {
      return res.status(400).json({ error: "Missing required fields: userId, skillId" });
    }

    const result = await removeSkillFromUser(userId, skillId);

    res.status(200).json({ success: true, data: result, message: "Skill removed from user" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove skill from user" });
  }
};
