import {getFilteredTasks} from "../../../operateDatabaseFunctions/filterTasks";
import {LatLngLiteral} from "../../../interfaces/google.interface";
import {IFilterTasks, ITask} from "../../../interfaces/task.interface";
const queryGetFilteredTasks = async (
    _:any,
    {
      currentLatLng,
      taskFilter,
    }: {
      currentLatLng: LatLngLiteral,
      taskFilter: IFilterTasks
    }
): Promise<ITask[]>=>{
  console.log("currentLatLng:", currentLatLng, "111111111111");
  // console.log("taskFilter:", taskFilter, "222222222");
  return getFilteredTasks(currentLatLng, taskFilter);
};


export default queryGetFilteredTasks;
