import { Request, Response } from "express";
import { getApplicationById } from "../../services/applications.service";

export const getApplicationController = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;

    if (!applicationId || Array.isArray(applicationId)) {
      return res.status(400).json({ error: "Application ID is required" });
    }

    const application = await getApplicationById(applicationId);
    res.status(200).json({ success: true, data: application });
  } catch (error: any) {
    if (error.message === "Application not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to fetch application" });
  }
};
