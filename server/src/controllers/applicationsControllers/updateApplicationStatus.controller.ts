import { Request, Response } from "express";
import { updateApplicationStatus } from "../../services/applications.service";

export const updateApplicationStatusController = async (req: Request, res: Response) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!applicationId || Array.isArray(applicationId)) {
      return res.status(400).json({ error: "Application ID is required" });
    }

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const application = await updateApplicationStatus(applicationId, status);

    res.status(200).json({ success: true, data: application });
  } catch (error: any) {
    if (error.message === "Application not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update application status" });
  }
};
