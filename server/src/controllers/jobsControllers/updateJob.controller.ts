import { Request, Response } from "express";
import { updateJob } from "../../services/jobs.service";

export const updateJobController = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const { title, description, location, salary_min, salary_max, remote, application_url } = req.body;

    if (!jobId || Array.isArray(jobId)) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await updateJob(jobId, {
      title,
      description,
      location,
      salary_min,
      salary_max,
      remote,
      application_url,
    });

    res.status(200).json({ success: true, data: job });
  } catch (error: any) {
    if (error.message === "Job not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update job" });
  }
};
