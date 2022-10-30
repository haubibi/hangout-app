import {
    useContext,
    useEffect,
    useState,
} from "react";
import { 
    Spin, 
    message 
} from 'antd';
import {
    useNavigate,
    useParams,
    useLocation
 } from "react-router-dom";
// import { TaskForm } from "../../components/form-component/task-form/task-form.component";
import { TaskFormPageContainer } from './task-form-page.styles';
import { UserContext } from '../../context/user.context';
import { 
    useGetTaskFormById,
    TaskFormErrorEnum
 } from "../../utils/customised_hooks/useGetTaskById";
 import { ITask } from "../../interfaces/task.interface";

import { TaskFormItem } from '../../components/form-component/task-form-item/task-form-item.component';
import { useCheckTimeExpired } from "../../utils/customised_hooks/useCheckTimeExpired";
import { MenuKey } from "../../context/navigation.context";
import { NavigationContext } from "../../context/navigation.context";

export enum TaskFormUserTypeEnum {
    Not_Log_IN = "Not_Log_IN",
    USER_NOT_MATCH = "USER_NOT_MATCH",
    USER_MATCH = "USER_MATCH"
}



const TaskFormPage = () =>{
    const { currentUser } =  useContext(UserContext);
    const [ userId, setUserId ] =  useState<string>();
    const { taskId } = useParams();
    const [ task, setTask ] =  useState<ITask>();
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    // const [ currentUserType, setCurrentUserType] = useState<TaskFormUserTypeEnum>();
    const { data, loading, error, isNewTaskForm, refetch } = useGetTaskFormById(
        userId,
        taskId
    );
    const { isExpired, isLoading} = useCheckTimeExpired({
        startDate: task?.startDate,
        startTime: task?.startTime
    });

    //set menu key
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.TASKFORM)
    },[setCurrentMenuKey])


    //check current user, get the id of user
    useEffect(()=>{
        if(currentUser) {
            const { uid } = currentUser;
            setUserId(uid);
        } else {
            message.info(`Please log in first!`, 5)
            .then(()=>navigate(`/logIn`,{state:{pathname}}));
        }
    },[currentUser, navigate, pathname, refetch])
    

    //get the task
    useEffect(()=>{
        if(data) {
            setTask(data);
        }
    },[data, setTask]);
    

     //check if expired
     useEffect(()=>{
        if(!isLoading && typeof isExpired === 'boolean') {
            if(isExpired){
                // console.log(222)
                navigate(`/`);
                message.info(`The event is expired`);
            }
        }
    },[isExpired, isLoading, navigate])

    //check if current user match organizer
    useEffect(()=>{
        if(task){
            if((error && error === TaskFormErrorEnum.USER_NOT_MATCH_ORGANIZER) || currentUser.uid !== task.organizer) {
                message.info(`You're not the orgnizer of the event!`, 3)
                .then(()=>navigate(`/`));
            }
        }
    },[currentUser, task, error, navigate]);

    
    //set error message
    useEffect(()=>{
        if(error && error !== TaskFormErrorEnum.USER_NOT_MATCH_ORGANIZER) {
            message.error(error.toString(),3).then(()=>navigate(`/`));
        }
    },[error, navigate])


    if (loading || !task || isExpired) return <Spin />;
    message.destroy();
    return (
        <TaskFormPageContainer>
           <TaskFormItem
                task = {task}
                isNewTaskForm = {isNewTaskForm}
                refetch = {refetch}
            />
        </TaskFormPageContainer>
    )
}

export default TaskFormPage;