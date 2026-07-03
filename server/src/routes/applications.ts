import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getApplicationsController } from "../controllers/applicationsControllers/getApplications.controller";
import { getApplicationController } from "../controllers/applicationsControllers/getApplication.controller";
import { createApplicationController } from "../controllers/applicationsControllers/createApplication.controller";
import { updateApplicationStatusController } from "../controllers/applicationsControllers/updateApplicationStatus.controller";
import { deleteApplicationController } from "../controllers/applicationsControllers/deleteApplication.controller";

const ApplicationsRouter = Router();

ApplicationsRouter.get("/", protect, getApplicationsController);
ApplicationsRouter.get("/:applicationId", protect, getApplicationController);
ApplicationsRouter.post("/", protect, createApplicationController);
ApplicationsRouter.patch("/:applicationId/status", protect, updateApplicationStatusController);
ApplicationsRouter.delete("/:applicationId", protect, deleteApplicationController);

export default ApplicationsRouter;