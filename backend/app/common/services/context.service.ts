import prisma from "../services/database.service";
import { verifyAccessToken } from "../services/token.service";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface Context {
  user?: { userId: string };
  prisma: typeof prisma;
}

export const context = ({ req }: { req: Request }): Context => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
  
    let user: { userId: string } | undefined = undefined;
    if (token) {
      const decoded = verifyAccessToken(token); // Decode and verify token
  
      if (decoded && (decoded as JwtPayload).userId) {
        if (typeof decoded !== 'string' && decoded.userId) {
          user = { userId: decoded.userId };
        }
      }
    }
  
    return { user, prisma };
  };
  
