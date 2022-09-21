import {getFilteredTasks} from "../../../operateDatabaseFunctions/filterTasks";
import {LatLngLiteral} from "../../../interfaces/google.interface";
import {IFilterTasks, ITask} from "../../../interfaces/task.interface";
const queryGetFilteredTasks = async (
    _:any,
    {
      currentLatlng,
      taskFilter,
    }: {
        currentLatlng: LatLngLiteral,
        taskFilter: IFilterTasks
    }
): Promise<ITask[]>=>{
  return getFilteredTasks(currentLatlng, taskFilter);
};


export default queryGetFilteredTasks;
