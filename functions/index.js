const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const _ = require('lodash');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { ScalarNameResolver } = require('graphql-scalars');

const serviceAccount = require('./hang-out-213d4-firebase-adminsdk-tegov-4bac51b898.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://hang-out-213d4-default-rtdb.firebaseio.com"
})

const db = admin.database();

    
const typeDefs = gql`
    input TaskInput {
        id: ID!
        title:String!
        startDate: String!
        startTime: String!
        endDate: String!
        endTime: String!
        organizer: UserInput!
        description:String!
        location: LocationInput!
        participantsNumber: Int!

    }
    input UserInput {
        uid:String!
        displayName: String
        email: String!
    }

    input LocationInput {
        lat: Float!
        lng: Float!
    }

    type Location {
        lat: Float!
        lng: Float!
    }

    type Task{
        id: ID!
        title:String!
        startDate: String!
        startTime: String!
        endDate: String!
        endTime: String!
        organizer: User!
        participants: [User]
        description:String!
        reviews: [Review]!
        location: Location!
        participantsNumber: Int!
    }
    type Review {
        review: String
        user: User
    }
    type Email {
        email: String
    }
    type User {
        uid:String!
        displayName: String
        email: String!
    }
    type Query {
        users: [User]
        tasks: [Task]
        getTaskById(id: String): Task
        getUserById(uid: String): User
        getAllEmails: [Email]
    }

    type Mutation {
        addTask(taskObj:TaskInput): Task
        addUser(uid:String, displayName: String, email: String): User
    }


`


const resolvers = {
    // ScalarName: ScalarNameResolver,
    Query: {
        users: async() =>{
            return db.ref("users")
                    .once("value")
                    .then(snap =>snap.val())
                    .then(value => Object.keys(value).map((key)=>value[key]));
        },
        tasks: async() =>{
            return db.ref("tasks")
                    .once("value")
                    .then(snap =>snap.val())
                    .then(value => Object.keys(value).map((key)=>value[key]));
        }, 
        getTaskById: async(_,{id})=>{
            return db.ref("tasks")
                    .once("value")
                    .then(snap =>snap.val())
                    .then(value => {
                        return value.filter((task)=>task.id === id)[0];
                    });
        },
        getUserById: async(_,{uid})=>{
            return db.ref("users")
                    .once("value")
                    .then(snap =>snap.val())
                    .then(value => {
                        const users = Object.keys(value).map((key)=>value[key]);
                        return users.filter((user)=>user.uid === uid)[0];
                    });
        },
        getAllEmails: async()=>{
            return db.ref("users")
                    .once("value")
                    .then(snap =>snap.val())
                    .then(value => {
                        const users = Object.keys(value).map((key)=>value[key]);
                        return users.map((user)=>{return {email: user.email}});
                    });
        }
    },

    // mutation(
    //     $id:String,
    //     $title:String,
    //     $description:String
    //   ) {
    //     addTask(
    //       id:$id, 
    //       title: $title, 
    //       description: $description
    //       ) 
    //     {
    //       id
    //       title
    //       description
    //     }
    //   }

    // mutation(
    //     $id:String,
    //     $displayName:String,
    //     $email:String
    //   ) {
    //     addUser(
    //       id:$id, 
    //       displayName: $displayName, 
    //       email: $email
    //       ) 
    //     {
    //       id
    //       displayName
    //       email
    //     }
    //   }

    // {
    //     "id":"4",
    //     "displayName":"biao",
    //     "email":"349274297@qq.com"
    //   }
      
    Mutation: {
        addTask: async(
            _,
            {taskObj}
        ) => {
            console.log(_,taskObj)
            const taskRef = db.ref("tasks");
            const task = {
                ...taskObj,
                participants: [],
                reviews:[],
                hide: false,
                status: 'open'
            }
            taskRef.push(task);
            return task;
        },
        addUser: async(
            _,
            {uid, displayName, email},
        ) => {
            const userRef = db.ref("users");
            const user = {
                displayName,
                email,
                uid
            };
            
            const isRepeat = await db.ref("users")
            .once("value")
            .then(snap =>snap.val())
            .then(value => {
                const mails = Object.keys(value).map((key)=>value[key].email);
                const uids = Object.keys(value).map((key)=>value[key].uid);
                const mailsIndex = mails.findIndex(mail => mail === email);
                const uidsIndex = uids.findIndex(id => id === uid);
                if(mailsIndex === -1 && uidsIndex === -1){
                    return false;
                }
                return true;
            });
            // console.log(isRepeat)
            if(!isRepeat){
                await userRef.push(user);
            }
            return user;
        }
    }
}

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
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
