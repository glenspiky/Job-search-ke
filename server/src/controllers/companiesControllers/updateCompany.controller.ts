import { Request, Response } from "express";
import { updateCompany } from "../../services/companies.service";

export const updateCompanyController = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const { name, website, logo_url } = req.body;

    if (!companyId || Array.isArray(companyId)) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    const company = await updateCompany(companyId, {
      name,
      website,
      logo_url,
    });

    res.status(200).json({ success: true, data: company });
  } catch (error: any) {
    if (error.message === "Company not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update company" });
  }
};
