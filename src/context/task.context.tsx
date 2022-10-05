import { 
  createContext, 
  FC, 
  Dispatch, 
  useState, 
  useEffect 
} from "react";
import { useMutation } from '@apollo/client';
import { ADD_TASK } from "../utils/graphql/mutation.utils";
import { ITask } from '../interfaces/task.interface';

export interface ITaskContext {
  currentTask: null | ITask;
  setCurrentTask: Dispatch<React.SetStateAction<ITask| null>>;
}
const initTaskContext:ITaskContext = {
  currentTask: null,
  setCurrentTask: ()=>{},
}


export const TaskContext = createContext(initTaskContext);

export interface IProviderChildrenProps {
    children: JSX.Element[] | JSX.Element
  }

export const TaskProvider:FC<IProviderChildrenProps> = ({children}) =>{
    const [currentTask, setCurrentTask] = useState<ITask | null>(null);
    const [addTask] = useMutation(ADD_TASK);
    useEffect(()=>{
      if(currentTask !== null){
          const add = async()=>{
              await addTask({
                 variables:{
                    taskObj: currentTask
                }
              });
          }
          add();
      }

  },[currentTask, addTask])
    const value = {
      currentTask,
      setCurrentTask
    };
    return <TaskContext.Provider value = {value}>{children}</TaskContext.Provider>
}