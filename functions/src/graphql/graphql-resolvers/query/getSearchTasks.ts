import getSearchTasks from "../../../input-search-tasks/input-search";
import { ITaskSearchInput, ISearchTaskReturnType } from "../../../interfaces/task.interface";

const queryGetSearchTasks= async (
    _:any,
    {
        input,
        taskStartIndex,
        amout,
    }: ITaskSearchInput
):Promise<ISearchTaskReturnType> =>{
  console.log("input:", input);
  console.log("taskStartIndex:", taskStartIndex);
  console.log("amout:",amout);
  return getSearchTasks(input, taskStartIndex, amout);
};


export default queryGetSearchTasks;
