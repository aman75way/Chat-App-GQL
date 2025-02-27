import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, verifyRefreshToken, generateAccessToken, generateRefreshToken } from "../services/token.service";
import prisma from "../services/database.service";
import { JwtPayload } from "jsonwebtoken"; 

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Access token required" });
    }

    // Verify Access Token
    const decoded = verifyAccessToken(accessToken) as JwtPayload | null;
    
    if (decoded && typeof decoded === "object" && decoded.userId) {
      req.user = { userId: decoded.userId };
      return next();
    }


    const { refreshToken } = req.body; // Send refresh token in request body

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const verifiedRefreshToken = (await verifyRefreshToken(refreshToken)) as JwtPayload | null;
    if (!verifiedRefreshToken || typeof verifiedRefreshToken !== "object" || !verifiedRefreshToken.userId) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(verifiedRefreshToken.userId);
    const newRefreshToken = await generateRefreshToken(verifiedRefreshToken.userId);

    return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    console.error("Authentication Error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
