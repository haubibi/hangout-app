import { createContext, FC, Dispatch, useState, useEffect } from "react";
import { gql, useQuery,useMutation } from '@apollo/client';
import { ADDTASK , ADDUSER} from "../utils/graphql/mutation.utils";
import { ITaskInputString } from "../utils/interfaces/task.interface";
import React from "react";

export interface ITaskContext {
  currentTask: null | ITaskInputString;
  setCurrentTask: Dispatch<React.SetStateAction<ITaskInputString| null>>;
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
    const [currentTask, setCurrentTask] = useState<ITaskInputString | null>(null);
    const [addTask] = useMutation(ADDTASK);
    const [addUser] = useMutation(ADDUSER);
    useEffect(()=>{
      console.log(currentTask)
      if(currentTask !== null){
            // const add = async()=>{
            //     await addUser({
            //        variables:{
            //             displayName: 'asfs',
            //             uid: 'sdfsdf',
            //             email: 'sdfsdfsd'
            //        } 
            //     });
            // }
            // add();
          const add = async()=>{
            console.log(currentTask)
              await addTask({
                 variables:{
                    taskObj: currentTask
                }
              });
          }
          add();
          // console.log(add)
      }
      // console.log(user, currentUser)

  },[currentTask])
    const value = {
      currentTask,
      setCurrentTask
    };
    return <TaskContext.Provider value = {value}>{children}</TaskContext.Provider>
}