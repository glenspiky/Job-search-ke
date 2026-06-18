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

    // send the token back to the client
    res.status(201).json({ message: "User registerd successfully", user });
  } catch (error) {
    res.status(400).json({ error: "Register failed" });
    console.log(error);
  }
};
