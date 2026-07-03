import { Request, Response } from "express";
import * as authService from "../../services/auth.service";

export const registerController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password, first_name, last_name, phone } = req.body;

    // simple validation
    if (!email || !password || !first_name || !last_name) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // call the service layer
    const { user, token } = await authService.register({
      email,
      password_plain: password,
      first_name,
      last_name,
      phone,
    });

    // set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // send the token back to the client
    res.status(201).json({ message: "User registerd successfully", user });
  } catch (error: any) {
    console.error("Registration Error:", error);
    res.status(400).json({
      error: "Register failed",
      details: error.message || error, // This will show you the real error in the browser network tab
    });
  }
};
