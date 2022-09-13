const admin = require("firebase-admin");
const serviceAccount = require('./hang-out-213d4-firebase-adminsdk-tegov-4bac51b898.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://hang-out-213d4-default-rtdb.firebaseio.com"
})

const db = admin.database();
const collections = {
    users: 'users',
    tasks: 'tasks'
}

exports.db = db;
exports.collections = collections;
