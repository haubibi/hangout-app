import { 
    useContext, 
    FC,
    useState,
    useEffect,
    useCallback
} from "react";
import { 
    ITask, 
    CurrentTaskUserTypeEnum,
    TaskRefetchType
 } from '../../interfaces/task.interface';
import { useMutation } from "@apollo/client";
import { TaskCarousel } from '../task-component/task-carousel/task-carousel.component';
import { 
    ADD_PARTICIPANT, 
    QUIT_PARTICIPANT,
} from "../../utils/graphql/mutation.utils";
import { 
    Button,
 } from "antd";

import { 
    TaskitemContainer,
    TitleCon,
    DescriptionCon,
    RowCon,
    CenterAlignCol,
 } from './task-item.styles';
import { UserContext } from "../../context/user.context";
import { AddTaskRequestEnum, QuitTaskRequestEnum } from '../../interfaces/notifications.interface';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
    IPaticipant,
    // checkIfParticipantsMax,
} from '../../interfaces/participate.interface';

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
    const { title, description, showImages, organizer } = task;


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
            <CenterAlignCol span={24}>
                <DescriptionCon> {description}</DescriptionCon>
            </CenterAlignCol>
        </RowCon>
        {
            showImages?
            <RowCon>
                <CenterAlignCol span={24}>
                    <TaskCarousel images = {showImages}></TaskCarousel>
                </CenterAlignCol>
            </RowCon>:
            undefined
        }




        {
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
