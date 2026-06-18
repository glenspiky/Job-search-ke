import { Request, Response } from "express";
import * as authService from "../../services/auth.service";

export const meController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Not authorized, missing user context" });
      return;
    }
    // get data from d
    const user = await authService.getCurrentUser(userId);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({ error: "Session invalid" });
  }
};
