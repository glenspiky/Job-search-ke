import { Request, Response } from "express";

export const Logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error logging out" });
  }
};
