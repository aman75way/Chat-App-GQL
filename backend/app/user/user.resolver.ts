import prisma from "../common/services/database.service";
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "../common/services/token.service";
import { Context } from "../common/services/context.service";

export const userResolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: Context) => {
      if (!context.user) {
        console.error("Unauthorized access attempt!");
        throw new Error("Unauthorized");
      }
      const user = await context.prisma.user.findUnique({
        where: { id: context.user.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  },

  User: {},
  Mutation: {
    signup: async (_: any, { email, password, fullName, gender }: any) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await hashPassword(password);
      const profilePic = gender === "MALE"
      ? `https://avatar.iran.liara.run/public/boy?username=${email}`
      : `https://avatar.iran.liara.run/public/girl?username=${email}`;

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, profilePic, fullName, gender },
      });

      const accessToken = generateAccessToken(user.id);
      const refreshToken = await generateRefreshToken(user.id);

      return { accessToken, refreshToken, user };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await comparePassword(password, user.password))) {
        throw new Error("Invalid credentials");
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = await generateRefreshToken(user.id);

      return { accessToken, refreshToken, user };
    },
    logout: async (_: any, __: any, { user }: any) => {
      console.log("User from context:", user);

      if (!user || !user.userId) {
        // console.error("Unauthorized: User not found in context");
        throw new Error("Unauthorized");
      }

      await prisma.user.update({
        where: { id: user.userId },
        data: { refreshToken: null },
      });

      return true;
    },
  },
};
