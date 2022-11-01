import {
    useEffect,
    useState,
    useContext
} from "react";
import { TaskContainer, BackHomeLink } from './task.styles';
import { TaskItem } from "../../components/task-component/task-item/task-item.component";
import { useLocation } from 'react-router-dom';
import { AddTaskRequestEnum, QuitTaskRequestEnum } from '../../interfaces/notifications.interface';
import { 
    ITask, 
    CurrentTaskUserTypeEnum,
 } from '../../interfaces/task.interface';
import { useQuery } from "@apollo/client";
import { GET_TASK_BY_ID } from "../../utils/graphql/query.utils";
import { 
    NavigationContext,
    MenuKey,
 } from "../../context/navigation.context";
import { Spin } from "antd";
import { IPaticipant } from "../../interfaces/participate.interface";
import { UserContext } from "../../context/user.context";
import { useCheckTimeExpired } from "../../utils/customised_hooks/useCheckTimeExpired";

const getTaskIdFromPath = (
    path: string
):string => {
    const isTaskPathValid = path.indexOf("task_") === -1? false: true;
    if (!isTaskPathValid) return '';
    const index = path.indexOf("_");
    return path.substring(index+ 1);
};
const getCurretUserType = (
    taskParticipants: IPaticipant[],
    orginizerUid: string,
    currentUserUid: string,
):CurrentTaskUserTypeEnum => {
    taskParticipants = taskParticipants? taskParticipants: [];
    //current user is orgnizer
    if(orginizerUid === currentUserUid) return CurrentTaskUserTypeEnum.ORGNIZER;
     //current user is not confirmed
     const inConsiderationParticipantsIndex = taskParticipants.findIndex(participant => 
        participant.participantUid === currentUserUid && 
        !participant.isConfirmed &&
        !participant.agreed &&
        participant.requestType === AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST

    );
    if(inConsiderationParticipantsIndex !== -1) return CurrentTaskUserTypeEnum.PARTICIPANT_NOT_CONFIRMED;


    //current user is the attendee
    const agreedParticipantIndex = taskParticipants.findIndex(participant => 
        participant.participantUid === currentUserUid && 
        participant.agreed && 
        participant.isConfirmed &&
        participant.requestType === AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST
    );
    if(agreedParticipantIndex !== -1) return CurrentTaskUserTypeEnum.PARTICIPANT_AGREED;


    //current user is rejected
    const rejectParticipantIndex = taskParticipants.findIndex(participant => 
        participant.participantUid === currentUserUid && 
        !participant.agreed && 
        participant.isConfirmed &&
        participant.requestType === AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST
    );
    if(rejectParticipantIndex !== -1) return CurrentTaskUserTypeEnum.PARTICIPANT_REJECT;
    return CurrentTaskUserTypeEnum.GUEST_LOGIN;
};


const Task = () =>{
    const { currentUser } =  useContext(UserContext);
    const { pathname } = useLocation();
    const [ taskId, setTaskId ] = useState<string>('');
    const [ task, setTask ] = useState<ITask>();
    const [ userType, setUserType ] = useState<CurrentTaskUserTypeEnum>();
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const [ ifTaskExpired, setIfTaskExpired ] =  useState<boolean>(false);
    const { data, loading, error, refetch } = useQuery(GET_TASK_BY_ID,{
        variables: {
            id: taskId
        }
    });
    const { isExpired, isLoading} = useCheckTimeExpired({
        startDate: task?.startDate,
        startTime: task?.startTime
    });


    //set menu key
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.TASK)
    },[setCurrentMenuKey])

    
    //get the taskId
    useEffect(()=>{
        const taskId = getTaskIdFromPath(pathname);
        setTaskId(taskId);
    },[pathname]);

    //get task
    useEffect(()=>{
        if(data && data.getTaskById){
            setTask(data.getTaskById);
        }
    },[taskId, data]);

     //check if expired
     useEffect(()=>{
        if(!isLoading && typeof isExpired === 'boolean') {
            setIfTaskExpired(isExpired);
        }
    },[isExpired, isLoading]);
    
    //set current user type
    useEffect(()=>{
        if(!currentUser){
            setUserType(CurrentTaskUserTypeEnum.GUEST_WITHOUT_LOGIN);
        } else {
            if(task){
                const { participants, organizer} = task;
                const { uid } = currentUser;
                const userType = getCurretUserType(
                    participants,
                    organizer,
                    uid
                );
                setUserType(userType);
            }
        }
    },[currentUser, task, userType])


    // console.log("data:",data)
    // console.log("error:",error)
    // console.log("loading:",loading)
    if(error || loading || !task || !userType) return <Spin />;
    // console.log(location)
    return (
        <TaskContainer>
            <TaskItem 
                task = {task as ITask}
                taskRefetch = {refetch}
                userType = {userType}
                ifTaskExpired = {ifTaskExpired}
            ></TaskItem>
        </TaskContainer>
    )
}

export default Task;