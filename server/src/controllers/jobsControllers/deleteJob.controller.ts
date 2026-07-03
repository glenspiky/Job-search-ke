import { Request, Response } from "express";
import { deleteJob } from "../../services/jobs.service";

export const deleteJobController = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;

    if (!jobId || Array.isArray(jobId)) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await deleteJob(jobId);

    res.status(200).json({ success: true, data: job, message: "Job deleted successfully" });
  } catch (error: any) {
    if (error.message === "Job not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to delete job" });
  }
};
