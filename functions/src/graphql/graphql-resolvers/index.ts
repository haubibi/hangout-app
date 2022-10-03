/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import queryTasks from "./query/tasks";
import queryUsers from "./query/users";
import queryGetTaskById from "./query/getTaskById";
import queryGetUserById from "./query/getUserById";
import queryGetFilteredTasks from "./query/getFilteredTasks";
import queryGetParticipantNotification from "./query/getParticipantNotification";

import mutationAddTask from "./mutation/addTask";
import mutationAddUser from "./mutation/addUser";
import mutationAddParticipant from "./mutation/addParticipant";
import mutationQuitParticipant from "./mutation/quitParticipant";

const resolvers = {
  // ScalarName: ScalarNameResolver,
  Query: {
    users: queryUsers,
    tasks: queryTasks,
    getTaskById: queryGetTaskById,
    getUserById: queryGetUserById,
    getFilteredTasks: queryGetFilteredTasks,
    getParticipantNotification: queryGetParticipantNotification,
  },
  Mutation: {
    addTask: mutationAddTask,
    addUser: mutationAddUser,
    addParticipant: mutationAddParticipant,
    quitParticipant: mutationQuitParticipant,
  },
};

export default resolvers;
