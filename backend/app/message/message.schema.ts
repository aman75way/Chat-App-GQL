import { gql } from "apollo-server";

export const messageTypeDefs = gql`
  type Message {
    id: String!
    senderId: String!
    body: String!
    conversationId: String!
    createdAt: String!
  }

  type User {
    id: String!
    fullName: String!
    profilePic: String!
  }

  type Query {
    getMessages(userToChatId: String!): [Message]!
    conversations: [User]!
  }

  type Mutation {
    sendMessage(receiverId: String!, message: String!): Message!
  }
`;
