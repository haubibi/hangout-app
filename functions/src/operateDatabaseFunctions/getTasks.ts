import {db, Collection} from "../db";
import baseTask from "../default/baseTask";
import {ITask} from "../interfaces/task.interface";

const getTasks = async ():Promise<ITask[]>=> {
  return db.ref(Collection.tasks)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => {
        // console.log(value);
        const tasks = Object.keys(value).map((key)=>value[key]);
        return tasks.map((task)=>{
          return {
            ...baseTask,
            ...task,
          };
        });
      });
};

export default getTasks;
