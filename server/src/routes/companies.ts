import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getCompaniesController } from "../controllers/companiesControllers/getCompanies.controller";
import { getCompanyController } from "../controllers/companiesControllers/getCompany.controller";
import { createCompanyController } from "../controllers/companiesControllers/createCompany.controller";
import { updateCompanyController } from "../controllers/companiesControllers/updateCompany.controller";
import { deleteCompanyController } from "../controllers/companiesControllers/deleteCompany.controller";

const CompaniesRouter = Router();

CompaniesRouter.get("/", getCompaniesController);
CompaniesRouter.get("/:companyId", getCompanyController);
CompaniesRouter.post("/", protect, createCompanyController);
CompaniesRouter.patch("/:companyId", protect, updateCompanyController);
CompaniesRouter.delete("/:companyId", protect, deleteCompanyController);

export default CompaniesRouter;