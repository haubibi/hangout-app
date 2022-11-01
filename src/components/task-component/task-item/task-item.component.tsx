import { 
    useContext, 
    FC,
    useState,
    useEffect,
    useCallback,
    useMemo
} from "react";
import { 
    ITask, 
    CurrentTaskUserTypeEnum,
    TaskRefetchType
 } from '../../../interfaces/task.interface';
import { useMutation, useQuery } from "@apollo/client";
import { TaskCarousel } from '../task-carousel/task-carousel.component';
import { 
    ADD_PARTICIPANT, 
    QUIT_PARTICIPANT,
} from "../../../utils/graphql/mutation.utils";
import { 
    Button, 
    Spin
 } from "antd";

import { 
    TaskitemContainer,
    TitleCon,
    RowCon,
    CenterAlignCol,
    CarouselCol,
    TaskTimeLocationAttendeeCol,
    TaskDescriptionCol,
    TaskMapCol,
    TaskAttendeeAvatarCol,
    TaskTagsCol
 } from './task-item.styles';
import { UserContext } from "../../../context/user.context";
import { AddTaskRequestEnum, QuitTaskRequestEnum } from '../../../interfaces/notifications.interface';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getMomentByDateAndTimeString } from '../../../utils/date/date.utils';
import { TaskTimeLocationAttendee } from '../task-time-location-attendee/task-time-location-attendee.component';
import { TaskDescription } from '../task-description/task-description.component';
import { TaskMap } from '../task-map/task-map.component';
import { TaskAttendeeAvatar } from '../task-attendee-avatar/task-attendee-avatar.component';
import { IUser } from '../../../interfaces/user.interface';
import { GET_ALL_USERS } from '../../../utils/graphql/query.utils';
import { getAllAttendeesByTask } from '../../../utils/task/task.utils';
import { TaskTags } from '../task-tags/task-tags.component';

import { 
    getNumberofParticipants
} from '../../../interfaces/participate.interface';

import {
    carouselImgWidth,
    carouselImgHeight
} from '../../../utils/default-settings/event.settings';


interface ITaskItemProps{
    task: ITask;
    userType:CurrentTaskUserTypeEnum;
    taskRefetch: TaskRefetchType<{id: string}>;
    ifTaskExpired:boolean;
}


export enum TaskButtonTypeEnum {
    PARTICIPANT_APPLY = "PARTICIPANT_APPLY",
    PARTICIPANT_QUIT = "PARTICIPANT_QUIT",
    ORGNIZER_EDIT = "ORGNIZER_EDIT",
    ORGNIZER_DELTTE = "ORGNIZER_DELTTE",
}


export const TaskItem:FC<ITaskItemProps> = ({
    task,
    taskRefetch,
    userType,
    ifTaskExpired
}) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const { data} = useQuery(GET_ALL_USERS)
    const [ userApplyIsLoading, setUserApplyIsLoading ] = useState<boolean>(false);
    const [ userQuitIsLoading, setUserQuitIsLoading ] = useState<boolean>(false);
    const [ isReachMax, setIsReachMax ] = useState<boolean>();
    const [ addParticipant ] = useMutation(ADD_PARTICIPANT);
    const [ quitParticipant ] = useMutation(QUIT_PARTICIPANT);
    const [ attendees, setAttendees ] = useState<IUser[]>([]);

    const { 
        title, 
        description,
        keyWords,
        // organizer, 
        startDate,
        startTime, 
        endTime, endDate, 
        latLngAndAddress, 
        participantsNumber,
        participants,
        open
    } = task;
    const showImages = task.showImages || []
    // const startTimeMoment = useMemo(()=> getMomentByDateAndTimeString(startDate!, startTime!), [startDate,startTime]);
    const currentAttendees = useMemo(()=> getNumberofParticipants(participants),[participants]);

    

    //get attendees
    useEffect(()=>{
        if(data && data.users){
           const attendees = getAllAttendeesByTask(task, data.users);  
           setAttendees(attendees);
        }
    },[data,task]);

    //if attendees reach max
    useEffect(()=>{
        const reachMax = currentAttendees < participantsNumber? false:true;
        setIsReachMax(reachMax);
    },[participantsNumber,currentAttendees]);

    const applyOnClick = useCallback(async () => {
        const {uid} = currentUser;
        const {id} = task;
        if(uid && id){
            setUserApplyIsLoading(true);
            await addParticipant({
                variables:{
                    participantUid:uid,
                    taskId:id,
                    addTaskRequestType: AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST,
                } 
            }).then(()=>{
                taskRefetch({id}).then(()=>{
                    message.success(`You have sent the application!`);
                    setUserApplyIsLoading(false);
                });
                // navigate('/');
            }).catch((error)=> message.error(error.toString(), 5).then(()=> setUserApplyIsLoading(false)));
        }
    },[addParticipant, taskRefetch, currentUser, task]);


    const quitOnClick = useCallback(async () => {
        const {uid} = currentUser;
        const {id} = task;
        if(uid && id){
            setUserQuitIsLoading(true);
            await quitParticipant({
                variables:{
                    participantUid:uid,
                    taskId:id,
                    quitTaskRequestType: QuitTaskRequestEnum.PARTICIPANT_QUIT_REQUEST,
                } 
            }).then(()=>{
                taskRefetch({id}).then(()=>{
                    message.success(`You have quit the event!`);
                    setUserQuitIsLoading(false);
                });
                // navigate('/');
            }).catch((error)=> message.error(error.toString(), 5).then(()=> setUserQuitIsLoading(false)));
        }
    },[quitParticipant, taskRefetch, currentUser, task]);




    const modifyFormOnClick = useCallback(async () => {
        navigate(`/taskForm_${task.id}`)
    },[navigate, task]);

    if(!task) return <Spin />
   return (
    <TaskitemContainer>
        <RowCon>
            <CenterAlignCol span={24}>
                <TitleCon> {title}</TitleCon>
            </CenterAlignCol>       
        </RowCon>
        <RowCon>
            <CarouselCol 
                md = {{span: 24}}
                lg = {{span: 12}}
            >
                <TaskCarousel
                    imgWidth={carouselImgWidth}
                    imgHeight = {carouselImgHeight}
                    images = {showImages}
                />
            </CarouselCol>
            <TaskTimeLocationAttendeeCol
                md = {{span: 24}}
                lg = {{span: 12}}
            >
                <TaskTimeLocationAttendee
                    dateAndTime={{
                        startTime,
                        startDate,
                        endDate,
                        endTime
                    }}
                    location = {latLngAndAddress.address}
                    attendee = {{
                        maxAttendees: participantsNumber,
                        currentAttendees: currentAttendees
                    }}
                />
            </TaskTimeLocationAttendeeCol>
        </RowCon>
        <RowCon>
            <TaskDescriptionCol span={24}>
                <TaskDescription
                    description = {description}
                />
            </TaskDescriptionCol>
        </RowCon>
        
        <RowCon>
            <TaskMapCol span={24}>
                {
                    !latLngAndAddress?
                    <Spin />:
                    <TaskMap
                        address = {latLngAndAddress}
                    />
                }
            </TaskMapCol>
        </RowCon>
        <RowCon>
            <TaskAttendeeAvatarCol>
                <TaskAttendeeAvatar attendees={attendees}/>
            </TaskAttendeeAvatarCol>
        </RowCon>
        <RowCon>
            <TaskTagsCol>
                <TaskTags tags={keyWords}/>
            </TaskTagsCol>
        </RowCon>


        {
            ifTaskExpired? null:
            (()=>{
                switch(userType){
                    case CurrentTaskUserTypeEnum.GUEST_LOGIN:
                    case CurrentTaskUserTypeEnum.PARTICIPANT_REJECT:          
                        return(
                            (open && !isReachMax)? <RowCon>
                                <CenterAlignCol span={24}>
                                    <Button 
                                        type="primary" 
                                        htmlType="button"
                                        disabled = {userApplyIsLoading}
                                        onClick={ (e: any) => {applyOnClick();} }
                                    >
                                        Apply
                                    </Button>
                                </CenterAlignCol>
                            </RowCon>
                            : null
                        );
                    case CurrentTaskUserTypeEnum.PARTICIPANT_NOT_CONFIRMED:
                        return(
                            <RowCon>
                                <CenterAlignCol span={24}>
                                    <h2>You have submitted the application!</h2>
                                </CenterAlignCol>
                            </RowCon>
                        );
                    case CurrentTaskUserTypeEnum.GUEST_WITHOUT_LOGIN:
                        return(
                            <RowCon>
                                <CenterAlignCol span={24}>
                                    <h2>Please log in first!</h2>
                                </CenterAlignCol>
                            </RowCon>
                        );
                    case CurrentTaskUserTypeEnum.PARTICIPANT_AGREED:
                        return(
                            <RowCon>
                                <CenterAlignCol span={24}>
                                    <Button 
                                        type="primary" 
                                        htmlType="button"
                                        disabled = {userQuitIsLoading}
                                        onClick={ (e: any) => {quitOnClick();} }
                                    >
                                        Quit
                                    </Button>
                                </CenterAlignCol>
                            </RowCon>
                        );
                    case CurrentTaskUserTypeEnum.ORGNIZER:
                        return(
                            <RowCon>
                                <CenterAlignCol span={24}>
                                    <Button 
                                        type="primary" 
                                        htmlType="button"
                                        disabled = {userQuitIsLoading}
                                        onClick={ (e: any) => {modifyFormOnClick();} }
                                    >
                                        Modify
                                    </Button>
                                </CenterAlignCol>
                            </RowCon>
                        );
                }

            })()
        }
    </TaskitemContainer>
   )
}
