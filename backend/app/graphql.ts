import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs as userTypeDefs, resolvers as userResolvers } from "./user/user.schema";
import { typeDefs as messageTypeDefs, resolvers as messageResolvers } from "./message/message.schema";

export const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, messageTypeDefs],
  resolvers: [userResolvers, messageResolvers],
});
