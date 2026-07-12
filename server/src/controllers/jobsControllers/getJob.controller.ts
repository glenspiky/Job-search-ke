import { Request, Response } from "express";
import { getJobById } from "../../services/jobs.service";

export const getJobController = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    if (!jobId || Array.isArray(jobId)) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await getJobById(jobId);
    res.status(200).json({ success: true, data: job });
  } catch (error: any) {
    if (error.message === "Job not found") {
      return res.status(404).json({ error: error.message });
    }
    console.log(error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};
