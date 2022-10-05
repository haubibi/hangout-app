/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import queryTasks from "./query/tasks";
import queryUsers from "./query/users";
import queryGetTaskById from "./query/getTaskById";
import queryGetUserById from "./query/getUserById";
import queryGetFilteredTasks from "./query/getFilteredTasks";
import queryGetParticipantNotification from "./query/getParticipantNotification";
import queryGetSearchTasks from "./query/getSearchTasks";

import mutationAddTask from "./mutation/addTask";
import mutationDeleteTask from "./mutation/deleteTask";
import mutationAddUser from "./mutation/addUser";
import mutationAddParticipant from "./mutation/addParticipant";
import mutationQuitParticipant from "./mutation/quitParticipant";
import mutationUpdateTaskUpdateNotifications from "./mutation/updateTaskUpdateNotifications";
import mutationUpdateParticipantNotifications from "./mutation/updateParticipantNotifications";

const resolvers = {
  // ScalarName: ScalarNameResolver,
  Query: {
    users: queryUsers,
    tasks: queryTasks,
    getTaskById: queryGetTaskById,
    getUserById: queryGetUserById,
    getFilteredTasks: queryGetFilteredTasks,
    getParticipantNotification: queryGetParticipantNotification,
    getSearchTasks: queryGetSearchTasks,
  },
  Mutation: {
    addTask: mutationAddTask,
    deleteTask: mutationDeleteTask,
    addUser: mutationAddUser,
    addParticipant: mutationAddParticipant,
    quitParticipant: mutationQuitParticipant,
    updateTaskUpdateNotifications: mutationUpdateTaskUpdateNotifications,
    updateParticipantNotifications: mutationUpdateParticipantNotifications,
  },
};

export default resolvers;
