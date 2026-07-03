import { Request, Response } from "express";
import { deleteSkill } from "../../services/skills.service";

export const deleteSkillController = async (req: Request, res: Response) => {
  try {
    const { skillId } = req.params;

    if (!skillId || Array.isArray(skillId)) {
      return res.status(400).json({ error: "Skill ID is required" });
    }

    const skill = await deleteSkill(skillId);

    res.status(200).json({ success: true, data: skill, message: "Skill deleted successfully" });
  } catch (error: any) {
    if (error.message === "Skill not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to delete skill" });
  }
};
