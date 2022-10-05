import deleteTask from "../../../utils/deleteTask";
import { ITask } from "../../../interfaces/task.interface";
const mutationDeleteTask = async (
    _:any,
    {taskId}:{taskId: string}
):Promise<ITask | string> => {
  console.log("taskId:", taskId)
  return deleteTask(taskId);
};

export default mutationDeleteTask;
