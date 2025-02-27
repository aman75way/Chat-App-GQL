import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: String!
    email: String!
    fullName: String!
    profilePic: String
    active: Boolean
    gender: Gender
    createdAt: String
    updatedAt: String
  }

  enum Gender {
    MALE
    FEMALE
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(email: String!, password: String!, fullName: String!, gender: Gender!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    logout: Boolean
  }
`;
