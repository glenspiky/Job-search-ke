import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/usersControllers/getProfile.controller";

const UserRouter = Router();

UserRouter.get("/get/:userId", protect, getProfile);

export default UserRouter;
