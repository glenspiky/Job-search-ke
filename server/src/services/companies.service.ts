import * as db from "../utils/db";
import * as companiesQueries from "../queries/companies.queries";

export const getAllCompanies = async (limit = 10, offset = 0) => {
  const result = await db.query(companiesQueries.GET_ALL_COMPANIES, [limit, offset]);
  return result.rows;
};

export const getCompanyById = async (companyId: string) => {
  const result = await db.query(companiesQueries.GET_COMPANY_BY_ID, [companyId]);
  if (result.rows.length === 0) {
    throw new Error("Company not found");
  }
  return result.rows[0];
};

export const getCompanyByName = async (name: string) => {
  const result = await db.query(companiesQueries.GET_COMPANY_BY_NAME, [`%${name}%`]);
  return result.rows;
};

export const createCompany = async (companyData: {
  name: string;
  website?: string;
  logo_url?: string;
}) => {
  const { name, website, logo_url } = companyData;

  const result = await db.query(companiesQueries.CREATE_COMPANY, [
    name,
    website || null,
    logo_url || null,
  ]);

  return result.rows[0];
};

export const updateCompany = async (
  companyId: string,
  companyData: {
    name?: string;
    website?: string;
    logo_url?: string;
  }
) => {
  const { name, website, logo_url } = companyData;

  const result = await db.query(companiesQueries.UPDATE_COMPANY, [
    companyId,
    name,
    website,
    logo_url,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Company not found");
  }

  return result.rows[0];
};

export const deleteCompany = async (companyId: string) => {
  const result = await db.query(companiesQueries.DELETE_COMPANY, [companyId]);

  if (result.rows.length === 0) {
    throw new Error("Company not found");
  }

  return result.rows[0];
};