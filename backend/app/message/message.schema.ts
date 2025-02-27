import { gql } from "graphql-tag";
import MessageController from "./message.controller";

export const typeDefs = gql`
  type Message {
    id: ID!
    senderId: String!
    conversationId: String!
    body: String!
    createdAt: String!
  }

  type Query {
    getMessages(conversationId: String!): [Message!]
  }

  type Mutation {
    sendMessage(conversationId: String!, senderId: String!, body: String!): Message!
  }

  type Subscription {
    messageSent(conversationId: String!): Message!
  }
`;

export const resolvers = {
  Query: {
    getMessages: MessageController.getMessages,
  },
  Mutation: {
    sendMessage: MessageController.sendMessage,
  },
  Subscription: {
    messageSent: {
      subscribe: (_: any, { conversationId }: any, { pubsub }: any) => {
        return pubsub.asyncIterator(`MESSAGE_${conversationId}`);
      },
    },
  },
};
