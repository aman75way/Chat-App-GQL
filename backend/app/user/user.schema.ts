import { gql } from "graphql-tag";
import UserController from "./user.controller";
import { Gender, Role } from "@prisma/client";

export const typeDefs = gql`
  enum Role {
    USER
    ADMIN
  }

  enum Gender {
    MALE
    FEMALE
  }

  type User {
    id: ID!
    email: String!
    fullName: String!
    profilePic: String
    role: Role!
    gender: Gender
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    register(
      email: String!
      fullName: String!
      password: String!
      confirmPassword: String!
      gender: Gender!
      role: Role = USER # ✅ Default to USER if not provided
    ): AuthPayload!

    login(email: String!, password: String!): AuthPayload!
    refreshToken(refreshToken: String!): String!
    logout: Boolean!
  }
`;

export const resolvers = {
  Query: {
    me: UserController.me,
  },
  Mutation: {
    register: async (_: any, { email, fullName, password, confirmPassword, gender, role = Role.USER }: { email : string, fullName : string, password : string, confirmPassword : string, gender : Gender, role : Role}, { res }: any) => {
      return UserController.register(_, { user: { email, fullName, password, confirmPassword, gender, role } }, { res });
    },
    login: UserController.login,
    refreshToken: UserController.refreshToken,
    logout: UserController.logout,
  },
};
