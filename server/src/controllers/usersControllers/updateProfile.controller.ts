import { Request, Response } from "express";
import * as userService from "../../services/users.service";

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const updateData = req.body;
    const { profileId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updateProfile = await userService.updateUserProfile(
      userId,
      updateData,
      profileId,
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateProfile,
    });
  } catch (error: any) {
    // Check for the explicit errors thrown in your service layer
    if (error.message === "User Profile not found") {
      return res.status(404).json({ message: error.message });
    }

    if (error.message === "No fields provided to update") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ error: "Something went wrong" });
    console.log(error);
  }
};
