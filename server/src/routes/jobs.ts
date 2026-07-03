import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getJobsController } from "../controllers/jobsControllers/getJobs.controller";
import { getJobController } from "../controllers/jobsControllers/getJob.controller";
import { createJobController } from "../controllers/jobsControllers/createJob.controller";
import { updateJobController } from "../controllers/jobsControllers/updateJob.controller";
import { deleteJobController } from "../controllers/jobsControllers/deleteJob.controller";

const JobsRouter = Router();

JobsRouter.get("/", getJobsController);
JobsRouter.get("/:jobId", getJobController);
JobsRouter.post("/", protect, createJobController);
JobsRouter.patch("/:jobId", protect, updateJobController);
JobsRouter.delete("/:jobId", protect, deleteJobController);

export default JobsRouter;