import { Request, Response } from "express";
import { getAllCompanies } from "../../services/companies.service";

export const getCompaniesController = async (req: Request, res: Response) => {
  try {
    const { limit, offset } = req.query;

    const companies = await getAllCompanies(
      limit ? parseInt(limit as string) : undefined,
      offset ? parseInt(offset as string) : undefined
    );

    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
};
