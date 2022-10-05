import {
    useContext,
    useEffect,
    useState,
    useCallback
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

 import { ApolloError } from "@apollo/client";
import { TaskFormItem } from '../../components/form-component/task-form-item/task-form-item.component';


export enum TaskFormUserTypeEnum {
    Not_Log_IN = "Not_Log_IN",
    USER_NOT_MATCH = "USER_NOT_MATCH",
    USER_MATCH = "USER_MATCH"
}



const TaskFormPage = () =>{
    const { currentUser } =  useContext(UserContext);
    const [ userId, setUserId ] =  useState<string>();
    const [ task, setTask ] =  useState<ITask>();
    const [ errorMessage, setErrorMessage ] =  useState<string>();
    const { taskId } = useParams();
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [ currentUserType, setCurrentUserType] = useState<TaskFormUserTypeEnum>();
    const { data, loading, error, isNewTaskForm, refetch } = useGetTaskFormById(
        userId,
        taskId
    );

    //get the id of user
    useEffect(()=>{
        if(currentUser) {
            const { uid } = currentUser;
            setUserId(uid);
        }
    },[currentUser])
    
    
    //get the current type of form item
    useEffect(()=>{
        if(task){
            if(!currentUser){
                setCurrentUserType(TaskFormUserTypeEnum.Not_Log_IN);
            } else {
                if(error && error === TaskFormErrorEnum.USER_NOT_MATCH_ORGANIZER) {
                    setCurrentUserType(TaskFormUserTypeEnum.USER_NOT_MATCH);
                }
                if(currentUser.uid === task.organizer){
                    setCurrentUserType(TaskFormUserTypeEnum.USER_MATCH);
                } else {
                    setCurrentUserType(TaskFormUserTypeEnum.USER_NOT_MATCH);
                }
            }
        }
    },[currentUser, task, error]);

    //get the task
    useEffect(()=>{
        // console.log("data:",data)
        if(data) {
            setTask(data);
        }
    },[data, setTask])
    
    
    //set error message
    useEffect(()=>{
        if(error) {
            let msg:string;
            if(error === TaskFormErrorEnum.USER_NOT_MATCH_ORGANIZER) {
                msg = `You are not the orgnizer of the event!`;
            } else {
                msg = error.toString();
            }
            message.error(msg, 5);
            setErrorMessage(msg);
        }
    },[error, navigate])


    const currentUserTypeCheck = useCallback(()=>{
        switch(currentUserType){
            case TaskFormUserTypeEnum.Not_Log_IN:
                message.info(`Please log in first!`, 5);
                navigate(`/logIn`,{state:{pathname}});
                break;
            case TaskFormUserTypeEnum.USER_NOT_MATCH:
                message.info(`You're not the orgnizer of the event!`, 5);
                navigate(`/`);
                break;
        }
    },[currentUserType, navigate, pathname])




    return (
        <TaskFormPageContainer>
            <h2>this is a task form page</h2>
            <>
                {
                    loading ? <Spin />:
                    errorMessage ? <h2>{errorMessage}</h2> :
                    task? 
                    <TaskFormItem
                        task = {task}
                        isNewTaskForm = {isNewTaskForm}
                        refetch = {refetch}
                        currentUserType = {currentUserType}
                        currentUserTypeCheck = {currentUserTypeCheck}
                    />: null
                }
            </>
            
        </TaskFormPageContainer>
    )
}

export default TaskFormPage;