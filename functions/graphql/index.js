const functions = require("firebase-functions");
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

//realtime database
// const { db } = require('./db');

//typeDefs of graphql
const { typeDefs }= require('./graphql-typeDefs');
const resolvers = require('./graphql-resolvers/index')

// const serviceAccount = require('./hang-out-213d4-firebase-adminsdk-tegov-4bac51b898.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL:"https://hang-out-213d4-default-rtdb.firebaseio.com"
// })

// const db = admin.database();




const app = express();
const serverStart = async ()=> {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        path:'/',
        cors:true
    });
    
};

serverStart();


exports.graphql = functions.https.onRequest(app);
