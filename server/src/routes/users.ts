import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { getProfile } from "../controllers/usersControllers/getProfile.controller";
import { updateProfileController } from "../controllers/usersControllers/updateProfile.controller";

const UserRouter = Router();

UserRouter.get("/get/:userId", protect, getProfile);
UserRouter.patch("/update/:userId", protect, updateProfileController);

export default UserRouter;
