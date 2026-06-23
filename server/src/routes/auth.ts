import { Router } from "express";
import { registerController } from "../controllers/authControllers/register.controller";
import { loginController } from "../controllers/authControllers/login.controller";
import { protect } from "../middlewares/auth.middleware";
import { meController } from "../controllers/authControllers/me.controller";
import { Logout } from "../controllers/authControllers/logout.controller";

const AuthRouter = Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);
AuthRouter.get("/me", protect, meController);
AuthRouter.post("/logout", protect, Logout);

export default AuthRouter;
