import {db, Collection} from "../db";
import baseTask from "../default/baseTask";
import {ITask} from "../interfaces/task.interface";

const addTask = async (taskObj:ITask):Promise<ITask> => {
  const task = {
    ...baseTask,
    ...taskObj,
  };
  const taskRef = db.ref(`${Collection.tasks}/${taskObj.id}`);
  // const taskRef = tasksRef.child(taskObj.id);
  await taskRef.set(task);
  return task;
};

export default addTask;
