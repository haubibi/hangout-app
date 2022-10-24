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
import { useMutation } from "@apollo/client";
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
 } from './task-item.styles';
import { UserContext } from "../../../context/user.context";
import { AddTaskRequestEnum, QuitTaskRequestEnum } from '../../../interfaces/notifications.interface';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getMomentByDateAndTimeString, getCurrentMoment } from '../../../utils/date/date.utils';
import { TaskTimeLocationAttendee } from '../task-time-location-attendee/task-time-location-attendee.component';
import { TaskDescription } from '../task-description/task-description.component';
import { TaskMap } from '../task-map/task-map.component';
import { 
    IPaticipant,
    getNumberofParticipants
} from '../../../interfaces/participate.interface';
import { useLoadScript } from '@react-google-maps/api';
import {
    carouselImgWidth,
    carouselImgHeight
} from '../../../utils/default-settings/event.settings';
import { googleMapLibWithPlaces } from '../../../utils/googleMap/googleMap.utils'
interface ITaskItemProps{
    task: ITask;
    taskRefetch: TaskRefetchType<{id: string}>;
}


export enum TaskButtonTypeEnum {
    PARTICIPANT_APPLY = "PARTICIPANT_APPLY",
    PARTICIPANT_QUIT = "PARTICIPANT_QUIT",
    ORGNIZER_EDIT = "ORGNIZER_EDIT",
    ORGNIZER_DELTTE = "ORGNIZER_DELTTE",
}




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


export const TaskItem:FC<ITaskItemProps> = ({
    task,
    taskRefetch
}) => {
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const [ userType, setUserType ] = useState<CurrentTaskUserTypeEnum>();
    const [ userApplyIsLoading, setUserApplyIsLoading ] = useState<boolean>(false);
    const [ userQuitIsLoading, setUserQuitIsLoading ] = useState<boolean>(false);
    const [ isReachMax, setIsReachMax ] = useState<boolean>();
    const [ addParticipant ] = useMutation(ADD_PARTICIPANT);
    const [ quitParticipant ] = useMutation(QUIT_PARTICIPANT);
    const { 
        title, 
        description, 
        organizer, 
        startDate,
        startTime, 
        endTime, endDate, 
        latLngAndAddress, 
        participantsNumber,
        participants
    } = task;
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_PUBLISH_API_KEY!,
        libraries: googleMapLibWithPlaces,
    });
    const showImages = task.showImages || []
    const startTimeMoment = useMemo(()=> getMomentByDateAndTimeString(startDate!, startTime!), [startDate,startTime]);
    const currentAttendees = useMemo(()=> getNumberofParticipants(participants),[participants]);

    //set current user type
    useEffect(()=>{
        //haven't logged in
        if(!currentUser){
            setUserType(CurrentTaskUserTypeEnum.GUEST_WITHOUT_LOGIN);
        } else {
            const { participants, organizer} = task;
            const { uid } = currentUser;
            const userType = getCurretUserType(
                participants,
                organizer,
                uid
            );
            setUserType(userType);
        }
        console.log(userType)
    },[currentUser, task, userType])




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
                    latLngAndAddress?
                    <TaskMap
                        address = {latLngAndAddress}
                    />:
                    <Spin />
                }
            </TaskMapCol>
        </RowCon>



        {
            startTimeMoment.isBefore(getCurrentMoment())? null:
            (()=>{
                switch(userType){
                    case CurrentTaskUserTypeEnum.GUEST_LOGIN:
                    case CurrentTaskUserTypeEnum.PARTICIPANT_REJECT:
                        return(
                            <RowCon>
                                <CenterAlignCol span={24}>
                                    <Button 
                                        type="primary" 
                                        htmlType="button"
                                        disabled = {userApplyIsLoading}
                                        onClick={ (e: any) => {applyOnClick();} }
                                    >
                                        Attend
                                    </Button>
                                </CenterAlignCol>
                            </RowCon>
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
