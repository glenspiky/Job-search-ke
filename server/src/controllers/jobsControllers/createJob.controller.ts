import { Request, Response } from "express";
import { createJob } from "../../services/jobs.service";

export const createJobController = async (req: Request, res: Response) => {
  try {
    const { title, company_id, description, location, salary_min, salary_max, remote, application_url } = req.body;

    if (!title || !company_id || !description || !application_url) {
      return res.status(400).json({ error: "Missing required fields: title, company_id, description, application_url" });
    }

    const job = await createJob({
      title,
      company_id,
      description,
      location,
      salary_min,
      salary_max,
      remote,
      application_url,
    });

    res.status(201).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};
