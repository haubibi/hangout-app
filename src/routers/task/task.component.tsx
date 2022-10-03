import {
    useEffect,
    useState
} from "react";
import { TaskContainer } from './task.styles';
import { TaskItem } from "../../components/task-item/task-item.component";
import { useLocation } from 'react-router-dom';
import { 
    ITask,
    ITaskRefetchFC
 } from '../../interfaces/task.interface';
import { useQuery } from "@apollo/client";
import { GETTASKBYID } from "../../utils/graphql/query.utils";
import { Spin } from "antd";

const getTaskIdFromPath = (
    path: string
):string => {
    const isTaskPathValid = path.indexOf("task_") === -1? false: true;
    if (!isTaskPathValid) return '';
    const index = path.indexOf("_");
    return path.substring(index+ 1);
};


const Task = () =>{
    const { pathname } = useLocation();
    const [ taskId, setTaskId ] = useState<string>('');
    const [ task, setTask ] = useState<ITask>();
    const { data, loading, error, refetch } = useQuery(GETTASKBYID,{
        variables: {
            id: taskId
        }
    });
    
    //get the taskId
    useEffect(()=>{
        const taskId = getTaskIdFromPath(pathname);
        // console.log('taskId:', taskId);
        setTaskId(taskId);
    },[pathname]);


    useEffect(()=>{
        if(taskId !== '' && data && data.getTaskById){
            // console.log("Task:", data.getTaskById)
            console.log(data.getTaskById)
            setTask(data.getTaskById);
        }
    },[taskId, data]);

    console.log("data:",data)
    console.log("error:",error)
    console.log("loading:",loading)
    if(error || loading || !task) return <Spin />;
    // console.log(location)
    return (
        <TaskContainer>
            <h2>this is a task</h2>
            <TaskItem 
                task = {task as ITask}
                taskRefetch = {refetch}
            ></TaskItem>
        </TaskContainer>
    )
}

export default Task;