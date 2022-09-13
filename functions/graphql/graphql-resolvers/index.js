const queryUsers = require('./query/users');
const queryTasks = require('./query/tasks');
const queryGetTaskById = require('./query/getTaskById');
const queryGetUserById = require('./query/getUserById');


const mutationAddTask = require('./mutation/addTask');
const mutationAddUser = require('./mutation/addUser');

const resolvers = {
    // ScalarName: ScalarNameResolver,
    Query: {
        users: queryUsers,
        tasks: queryTasks, 
        getTaskById: queryGetTaskById,
        getUserById: queryGetUserById
    },
    Mutation: {
        addTask: mutationAddTask,
        addUser: mutationAddUser
    }
}

module.exports = resolvers;


// const resolvers = {
//     // ScalarName: ScalarNameResolver,
//     Query: {
//         users: async() =>{
//             return db.ref("users")
//                     .once("value")
//                     .then(snap =>snap.val())
//                     .then(value => Object.keys(value).map((key)=>value[key]));
//         },
//         tasks: async() =>{
//             return db.ref("tasks")
//                     .once("value")
//                     .then(snap =>snap.val())
//                     .then(value => Object.keys(value).map((key)=>value[key]));
//         }, 
//         getTaskById: async(
//             _,
//             {id}
//         )=>{
//             return db.ref("tasks")
//                     .once("value")
//                     .then(snap =>snap.val())
//                     .then(value => {
//                         const taskArr = Object.keys(value).map((key)=>value[key]);
//                         const taskIndex = taskArr.findIndex((task) => task.id === id);
//                         console.log(_,id, taskArr,taskIndex)
//                         if(taskIndex === -1){
//                             return null;
//                         } else {
//                             return taskArr[taskIndex];
//                         }
//                     });
//         },
//         getUserById: async(_,{uid})=>{
//             console.log(uid)
//             if(uid === '') return;
//             return db.ref("users")
//                     .once("value")
//                     .then(snap =>snap.val())
//                     .then(value => {
//                         const users = Object.keys(value).map((key)=>value[key]);
//                         return users.filter((user)=>user.uid === uid)[0];
//                     });
//         }
//     },
//     Mutation: {
//         addTask: async(
//             _,
//             {taskObj}
//         ) => {
//             // console.log(_,taskObj)
//             const tasksRef = db.ref("tasks");
//             const taskRef = tasksRef.child(taskObj.id);
//             const task = {...taskObj}
//             taskRef.set(task);
//             return task;
//         },
//         addUser: async(
//             _,
//             {userInput},
//         ) => {
//             console.log(userInput)
//             const {uid} = userInput;
//             const usersRef = db.ref("users");
//             const userRef = usersRef.child(uid);
//             userRef.set(userInput);
//             return userInput;
//         }
//     }
// }