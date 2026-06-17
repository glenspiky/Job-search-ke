import { Request, Response } from "express";
import * as authService from "../../services/auth.service";

export const loginController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Missing required fields" });
    }

    // call the service layer
    const data = await authService.login({ email, password_plain: password });

    //send back the clean user object
    res.status(200).json({
      message: "Login successful",
      ...data,
    });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
    console.log(error);
  }
};
