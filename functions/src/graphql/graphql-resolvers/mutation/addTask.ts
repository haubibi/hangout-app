import addTask from "../../../operateDatabaseFunctions/addTask";
import {ITask} from "../../../interfaces/task.interface";
const mutationAddTask = async (
    _:any,
    {taskObj}:{taskObj: ITask}
) => {
  return addTask(taskObj);
};

export default mutationAddTask;
