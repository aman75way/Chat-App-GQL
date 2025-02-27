import prisma from "../common/services/database.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { Gender, Role } from "@prisma/client";

class UserService {
  async createUser(
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    gender: Gender,
    role: Role = Role.USER
  ) {
    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const profilePic =
      gender === Gender.MALE
        ? `https://avatar.iran.liara.run/public/boy?username=${email}`
        : `https://avatar.iran.liara.run/public/girl?username=${email}`;

    return prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        profilePic,
        active: false,
        role : role as Role,
        gender: gender.toUpperCase() as Gender,
      },
    });
  }

  async getUserById(userId: string) {
    return prisma.user.findUnique({ where: { id: userId } });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async generateTokens(userId: string, res: Response) {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });

    await prisma.user.update({ where: { id: userId }, data: { refreshToken } });

    res.cookie("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV !== "development" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV !== "development" });

    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(refreshToken: string) {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as { userId: string };
    return prisma.user.findUnique({ where: { id: decoded.userId, refreshToken } });
  }

  async clearUserTokens(userId: string, res: Response) {
    await prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  }
}

export default new UserService();
