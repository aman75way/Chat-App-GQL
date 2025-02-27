import { Request } from "express";
import jwt from "jsonwebtoken";
import prisma from "../services/database.service";

export const context = async ({ req }: { req: Request }) => {
  const token = req.cookies.accessToken;
  if (!token) return { user: null };

  try {
    const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return { user };
  } catch {
    return { user: null };
  }
};