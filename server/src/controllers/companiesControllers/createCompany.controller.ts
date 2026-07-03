import { Request, Response } from "express";
import { createCompany } from "../../services/companies.service";

export const createCompanyController = async (req: Request, res: Response) => {
  try {
    const { name, website, logo_url } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing required field: name" });
    }

    const company = await createCompany({
      name,
      website,
      logo_url,
    });

    res.status(201).json({ success: true, data: company });
  } catch (error) {
    res.status(500).json({ error: "Failed to create company" });
  }
};
