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
    const { user, token } = await authService.login({
      email,
      password_plain: password,
    });

    res.cookie("token", token, {
      httpOnly: true, //xxs
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // csrf
      maxAge: 24 * 60 * 60 * 1000,
    });

    //send back the clean user object
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
    console.log(error);
  }
};
