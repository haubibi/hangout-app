import addTask from "../../../utils/addTask";
import {ITask} from "../../../interfaces/task.interface";
const mutationAddTask = async (
    _:any,
    {
      taskObj,
      isNewTaskForm
    }:{
      taskObj: ITask,
      isNewTaskForm: boolean
    }
) => {
  return addTask(taskObj, isNewTaskForm);
};

export default mutationAddTask;
