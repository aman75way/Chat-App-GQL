import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./app/graphql";
import prisma from "./app/common/services/database.service";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

const server = new ApolloServer({
  schema,
  context: ({ req, res }) => {
    const token = req.cookies.accessToken;
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      } catch (error) {
        console.error("Invalid token");
      }
    }
    return { req, res, prisma, user };
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(5000, () => {
    console.log(`Server ready at http://localhost:5000/graphql`);
  });
}

startServer();
