import { 
  createContext, 
  FC, 
  Dispatch, 
  useState, 
  useEffect 
} from "react";
import { 
  useQuery,
  OperationVariables,
  ApolloQueryResult,
  ApolloError
 } from '@apollo/client';
import { GET_All_TASKS } from "../utils/graphql/query.utils";
import { ITask } from '../interfaces/task.interface';

export interface ITasksContext {
  allTasks: ITask[];
  setAllTasks: Dispatch<React.SetStateAction<ITask[]>>;
  refetchAllTasks: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
  fetchAllTasksLoading: boolean;
  fetchAllTasksError: ApolloError;
}
const initTaskContext:ITasksContext = {
  allTasks: [],
  setAllTasks: ()=>{},
  refetchAllTasks: ()=> null,
  fetchAllTasksLoading: false,
  fetchAllTasksError: null
}


export const TasksContext = createContext(initTaskContext);

export interface IProviderChildrenProps {
    children: JSX.Element[] | JSX.Element
}

export const TasksProvider:FC<IProviderChildrenProps> = ({children}) =>{
    const [allTasks, setAllTasks] = useState<ITask[]>();
    const { data, loading, error, refetch} = useQuery(GET_All_TASKS);
    
    useEffect(()=>{
      if(data && data.tasks) {
        setAllTasks(data.tasks);    
      }
  },[setAllTasks, data]);


    const value = {
      allTasks,
      setAllTasks,
      refetchAllTasks: refetch,
      fetchAllTasksLoading: loading,
      fetchAllTasksError: error
    };
    return <TasksContext.Provider value = {value}>{children}</TasksContext.Provider>
}