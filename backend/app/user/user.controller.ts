import UserService from "./user.service";
import bcrypt from "bcryptjs";
import { Role, Gender } from "@prisma/client";

class UserController {
  async me(_: any, __: any, { user }: any) {
    if (!user) throw new Error("Not authenticated");
    return UserService.getUserById(user.userId);
  }

  async register(_: any, { user }: any, { res }: any) {
    const { email, fullName, password, confirmPassword, gender, role = Role.USER } = user;

    const existingUser = await UserService.getUserByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const newUser = await UserService.createUser(fullName, email, password, confirmPassword, gender as Gender, role as Role);

    const tokens = await UserService.generateTokens(newUser.id, res);
    return { ...tokens, user: newUser };
  }

  async login(_: any, { email, password }: any, { res }: any) {
    const user = await UserService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) throw new Error("Invalid credentials");

    const tokens = await UserService.generateTokens(user.id, res);
    return { ...tokens, user };
  }

  async refreshToken(_: any, { refreshToken }: any, { res }: any) {
    const user = await UserService.verifyRefreshToken(refreshToken);
    if (!user) throw new Error("Invalid refresh token");

    const newTokens = await UserService.generateTokens(user.id, res);
    return newTokens.accessToken;
  }

  async logout(_: any, __: any, { user, res }: any) {
    if (!user) throw new Error("Not authenticated");
    await UserService.clearUserTokens(user.userId, res);
    return true;
  }
}

export default new UserController();
