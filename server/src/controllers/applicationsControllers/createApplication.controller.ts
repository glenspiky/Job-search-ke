import { Request, Response } from "express";
import { createApplication, getApplicationByUserAndJob } from "../../services/applications.service";

export const createApplicationController = async (req: Request, res: Response) => {
  try {
    const { user_id, job_id, status, match_score } = req.body;

    if (!user_id || !job_id) {
      return res.status(400).json({ error: "Missing required fields: user_id, job_id" });
    }

    const existingApplication = await getApplicationByUserAndJob(user_id, job_id);
    if (existingApplication) {
      return res.status(400).json({ error: "Application already exists" });
    }

    const application = await createApplication({
      user_id,
      job_id,
      status,
      match_score,
    });

    res.status(201).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ error: "Failed to create application" });
  }
};
