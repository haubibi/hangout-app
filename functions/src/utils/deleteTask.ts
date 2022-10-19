import {db, Collection} from "../db";
import getTaskById from "./getTaskById";
import { ITask } from '../../../src/interfaces/task.interface';
const deleteTask = async (
    taskId: string
):Promise<ITask | string> => {
  return new Promise(async (resolve, reject)=>{
    const taskRef = db.ref(`${Collection.tasks}/${taskId}`);
    const task = await getTaskById(taskId);
    if(!task){
      return reject(`The event doesn't exist!`);
    } else {
      await taskRef.set(null);
      resolve(task);
    }
  })
};

export default deleteTask;
