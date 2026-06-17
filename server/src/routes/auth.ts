import { Router } from "express";
import { registerController } from "../controllers/authControllers/register.controller";
import { loginController } from "../controllers/authControllers/login.controller";

const AuthRouter = Router();

AuthRouter.post("/register", registerController);
AuthRouter.post("/login", loginController);

export default AuthRouter;
