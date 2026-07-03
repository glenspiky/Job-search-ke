import { Request, Response } from "express";
import { deleteCompany } from "../../services/companies.service";

export const deleteCompanyController = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;

    if (!companyId || Array.isArray(companyId)) {
      return res.status(400).json({ error: "Company ID is required" });
    }

    const company = await deleteCompany(companyId);

    res.status(200).json({ success: true, data: company, message: "Company deleted successfully" });
  } catch (error: any) {
    if (error.message === "Company not found") {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to delete company" });
  }
};
