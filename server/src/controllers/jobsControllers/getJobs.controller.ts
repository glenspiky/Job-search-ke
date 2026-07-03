import { Request, Response } from "express";
import { getAllJobs, searchJobs } from "../../services/jobs.service";

export const getJobsController = async (req: Request, res: Response) => {
  try {
    const { title, location, remote, limit, offset } = req.query;

    if (title || location || remote) {
      const jobs = await searchJobs({
        title: title as string,
        location: location as string,
        remote: remote === "true" ? true : remote === "false" ? false : undefined,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      return res.status(200).json({ success: true, data: jobs });
    }

    const jobs = await getAllJobs();
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
