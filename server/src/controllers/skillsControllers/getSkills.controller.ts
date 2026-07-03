import { Request, Response } from "express";
import { getAllSkills, getSkillsByUser, getSkillsByJob } from "../../services/skills.service";

export const getSkillsController = async (req: Request, res: Response) => {
  try {
    const { userId, jobId, limit, offset } = req.query;

    if (userId) {
      const skills = await getSkillsByUser(userId as string);
      return res.status(200).json({ success: true, data: skills });
    }

    if (jobId) {
      const skills = await getSkillsByJob(jobId as string);
      return res.status(200).json({ success: true, data: skills });
    }

    const skills = await getAllSkills(
      limit ? parseInt(limit as string) : undefined,
      offset ? parseInt(offset as string) : undefined
    );

    res.status(200).json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};
