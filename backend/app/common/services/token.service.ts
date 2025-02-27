import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "./database.service";

const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "15m" });
};

export const generateRefreshToken = async (userId: string) => {
  const refreshToken = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "7d" });

  // Store refresh token in DB
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken },
  });

  return refreshToken;
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null; // Return null if token is invalid or expired
  }
};

export const verifyRefreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    return decoded;
  } catch (err) {
    return null;
  }
};
