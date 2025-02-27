import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { userTypeDefs } from "./app/user/user.schema";
import { userResolvers } from "./app/user/user.resolver";
import { messageTypeDefs } from "./app/message/message.schema";
import { messageResolvers } from "./app/message/message.resolver";
import { context } from "./app/common/services/context.service";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs: [userTypeDefs, messageTypeDefs],
  resolvers: [userResolvers, messageResolvers],
  context: context,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, cors: false });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((err) => {
  console.error("Server failed to start", err);
});
