/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import queryTasks from "./query/tasks";
import queryUsers from "./query/users";
import queryGetTaskById from "./query/getTaskById";
import queryGetUserById from "./query/getUserById";
import queryGetFilteredTasks from "./query/getFilteredTasks";
import queryGetParticipantNotification from "./query/getParticipantNotification";

import mutationAddTask from "./mutation/addTask";
import mutationDeleteTask from "./mutation/deleteTask";
import mutationAddUser from "./mutation/addUser";
import mutationUpdateUserInfo from "./mutation/updateUserInfo";
import mutationAddParticipant from "./mutation/addParticipant";
import mutationQuitParticipant from "./mutation/quitParticipant";
import mutationUpdateTaskUpdateNotifications from "./mutation/updateTaskUpdateNotifications";
import mutationUpdateRequestNotifications from "./mutation/updateRequestNotifications";
import mutationUpdateApplicationNotifications from "./mutation/updateApplicationNotifications";
import mutationDeleteApplicationNotification from "./mutation/deleteApplicationNotification";
import mutationDeleteEventUpdateNotification from "./mutation/deleteEventUpdateNotification";

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
    deleteTask: mutationDeleteTask,
    addUser: mutationAddUser,
    updateUserInfo: mutationUpdateUserInfo,
    addParticipant: mutationAddParticipant,
    quitParticipant: mutationQuitParticipant,
    updateTaskUpdateNotifications: mutationUpdateTaskUpdateNotifications,
    updateRequestNotifications: mutationUpdateRequestNotifications,
    updateApplicationtNotifications: mutationUpdateApplicationNotifications,
    deleteApplicationNotification: mutationDeleteApplicationNotification,
    deleteEventUpdateNotification: mutationDeleteEventUpdateNotification,

  },
};

export default resolvers;
