/* eslint-disable no-restricted-globals */
import * as admin from "firebase-admin";
// eslint-disable-next-line max-len, @typescript-eslint/no-var-requires
import serviceAccount from "../hang-out-213d4-firebase-adminsdk-tegov-4bac51b898.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL:  "https://hang-out-213d4-default-rtdb.firebaseio.com"
});

export enum Collection {
    users = "users",
    tasks = "tasks"
}
export enum TaskChildren {
    participants = "participants",
    tasks = "tasks"
}
export enum UserChildren {
    notifications = "notifications",
    participants = "participants"
}
export enum NotificationEnum {
    taskUpdateNotification = "taskUpdateNotification",
    applicationNotification = "applicationNotification",
    requestNotification = "requestNotification",
    friendRequestNotification = "friendRequestNotification",
}
export const db = admin.database();

// const graphql = require("./graphql");
// import {onParticipateChange } from './participateRequest/index'
// const {onParticipateChange} = require("./participateRequest/index");


// console.log(name);
// exports.graphql = graphql.graphql;.eslintrc.js


// exports.onParticipateChange = onParticipateChange;

// exports.graphql = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
