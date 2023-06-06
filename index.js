// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import typeDefs from "./gql_schema/typeDefs/index.js";
import resolvers from "./gql_schema/resolvers/index.js";

import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const IN_PROD = process.env.ENVIRONMENT === "production";

//Initialize client.
const client = createClient({
  password: "@Rahat7700",
  socket: {
    host: "redis-14872.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port: 14872,
  },
});

const app = express();

//Initialize store
let redisStore = new RedisStore({
  client,
});

//Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
    rolling: true,
    cookie: {
      maxAge: parseInt(process.env.COOKIE_LIFETIME),
      sameSite: true,
      secure: IN_PROD,
    },
  })
);

app.disable("x-powered-by");
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: true,
  cache: "bounded",
});
await server.start();
app.use(
  "/graphql",
  cors({
    // origin: true,
    // credentials: true,
  }),
  json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => ({ token: req.headers.token, req, res }),
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
