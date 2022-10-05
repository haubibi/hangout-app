import {
    useEffect, 
    useState, 
} from "react";
import { 
    ITask,
    TaskRefetchType
 } from "../../interfaces/task.interface";
import { 
    useQuery,
    ApolloError
 } from '@apollo/client';
import { GETTASKBYID } from "../graphql/query.utils";
import { baseTaskCreator } from "../task/task.utils";


export enum TaskFormErrorEnum {
    USER_NOT_MATCH_ORGANIZER = "USER_NOT_MATCH_ORGANIZER"
}

export type UseGetTaskFormByIdReturnType = {
    loading: boolean;
    data: ITask | null;
    error: ApolloError | TaskFormErrorEnum;
    isNewTaskForm: boolean;
    refetch: TaskRefetchType<{id: string}>
}


export const useGetTaskFormById = (
    userId: string,
    taskId: string
): UseGetTaskFormByIdReturnType =>{
    const [ task, setTask ] = useState<ITask | null>(null);
    const [ isNewTaskForm, setIsNewTaskForm ] = useState<boolean>(true);
    const [ newTaskForm, setNewTaskForm] = useState<ITask | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);
    const [ taskFormError, setTaskFormError ] = useState<ApolloError | TaskFormErrorEnum>();
    const { data, loading, error, refetch} = useQuery(GETTASKBYID,{
        variables: {
            id: taskId
        }
    });

    //create new task form
    useEffect(()=>{
        const getTask = async() => {
            await baseTaskCreator(taskId, userId).then((task)=>{
                setNewTaskForm(task);
            });
        };
        if(userId && !newTaskForm) {
            getTask();
        }
    },[taskId, userId, newTaskForm])


    useEffect(()=>{
        if(!loading && userId && isLoading) {
            if(error){
                if(newTaskForm){
                    setTask(newTaskForm);
                    setIsNewTaskForm(true);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(true);
                if(data && data.getTaskById) {
                    const {__typename, ...task} = data.getTaskById;
                    if(userId === task.organizer){
                        setTask(task);
                        setIsNewTaskForm(false);
                    } else {
                        setTaskFormError(TaskFormErrorEnum.USER_NOT_MATCH_ORGANIZER);
                    }
                    setIsLoading(false);
                } else {
                    if(newTaskForm){
                        setTask(newTaskForm);
                        setIsNewTaskForm(true);
                        setIsLoading(false);
                    }
                }
            }
        }
    },[error, data, newTaskForm, task, loading, userId, isLoading]);

    return {
        loading: isLoading,
        data: task,
        error: taskFormError,
        isNewTaskForm,
        refetch
    }
}