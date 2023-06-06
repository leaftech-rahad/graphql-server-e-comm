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

// import session from "express-session";
// import RedisStore from "connect-redis";
// import { createClient } from "redis";

// Initialize client.
// let redisClient = createClient();
// redisClient.connect().catch(console.error);

const app = express();

// Initialize store.
// let redisStore = new RedisStore({
//   client: redisClient,
//   prefix: "myapp:",
// });

// Initialize session storage.
// app.use(
//   session({
//     store: redisStore,
//     resave: false, // required: force lightweight session keep alive (touch)
//     saveUninitialized: false, // recommended: only save session when data exists
//     secret: "keyboard cat",
//     rolling: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       secure: false,
//     },
//   })
// );

app.disable("x-powered-by");
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  csrfPrevention: true,
  cache: "bounded",
  //graphiql: true,
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
