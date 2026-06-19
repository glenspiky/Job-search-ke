import { type Request, type Response } from "express";
import { getUserProfileById } from "../../services/users.service";

export const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    if (!userId || typeof userId !== "string") {
      res.status(400).json({ error: "User id not found" });
      return;
    }

    const userProfile = await getUserProfileById(userId);
    if (!userProfile) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    return res.status(200).json({ success: true, data: userProfile });
  } catch (err) {
    res.status(400).json({ error: "Something went wrong" });
    console.log(err);
  }
};
