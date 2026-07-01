import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    // pass the id
    req.user = { id: decoded.id };
    // console.log("Cookies:", req.cookies);
    // console.log("Token:", req.cookies.token);
    console.log("success");
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};
