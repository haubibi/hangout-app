/* eslint-disable @typescript-eslint/no-floating-promises */
import * as functions from "firebase-functions";
import express from "express";
import {ApolloServer} from "apollo-server-express";

// typeDefs of graphql
import resolvers from "./graphql-resolvers";
import typeDefs from "./graphql-typeDefs";

const app = express();


const serverStart = async () => {
  const corsOptions = {
    origin: ["http://localhost:3000", "https://venerable-parfait-755a0a.netlify.app"],
    credentials: true,
  };
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: "/",
    cors: corsOptions,
  });
};

serverStart();


export default functions.https.onRequest(app);
// exports.graphql = functions.https.onRequest(app);
