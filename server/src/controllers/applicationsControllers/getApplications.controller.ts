import { Request, Response } from "express";
import { getApplicationsByUser, getApplicationsByJob } from "../../services/applications.service";

export const getApplicationsController = async (req: Request, res: Response) => {
  try {
    const { userId, jobId, limit, offset } = req.query;

    if (userId) {
      const applications = await getApplicationsByUser(
        userId as string,
        limit ? parseInt(limit as string) : undefined,
        offset ? parseInt(offset as string) : undefined
      );
      return res.status(200).json({ success: true, data: applications });
    }

    if (jobId) {
      const applications = await getApplicationsByJob(
        jobId as string,
        limit ? parseInt(limit as string) : undefined,
        offset ? parseInt(offset as string) : undefined
      );
      return res.status(200).json({ success: true, data: applications });
    }

    res.status(400).json({ error: "Either userId or jobId is required" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};
