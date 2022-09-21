
import queryTasks from "./query/tasks";
import queryUsers from "./query/users";
import queryGetTaskById from "./query/getTaskById";
import queryGetUserById from "./query/getUserById";

import mutationAddTask from "./mutation/addTask";
import mutationAddUser from "./mutation/addUser";
import mutationAddParticipant from "./mutation/addParticipant";

const resolvers = {
  // ScalarName: ScalarNameResolver,
  Query: {
    users: queryUsers,
    tasks: queryTasks,
    getTaskById: queryGetTaskById,
    getUserById: queryGetUserById,
  },
  Mutation: {
    addTask: mutationAddTask,
    addUser: mutationAddUser,
    addParticipant: mutationAddParticipant,
  },
};

export default resolvers;
