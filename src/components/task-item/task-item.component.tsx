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
    ITaskRefetchFC
 } from '../../interfaces/task.interface';
import { useMutation } from "@apollo/client";
import { TaskCarousel } from '../task-component/task-carousel/task-carousel.component';
import { 
    ADDPARTICIPANT, 
    QUITPARTICIPANT 
} from "../../utils/graphql/mutation.utils";
import { 
    Button,
    Spin
 } from "antd";

import { 
    TaskitemContainer,
    TitleCon,
    DescriptionCon,
    RowCon,
    BaseCol,
    CenterAlignCol,
 } from './task-item.styles';
import { UserContext } from "../../context/user.context";
import { AddTaskRequestEnum, QuitTaskRequestEnum } from '../../interfaces/notifications.interface';
import { message } from 'antd';
import { 
    IPaticipant,
    checkIfParticipantsMax,
} from '../../interfaces/participate.interface';

interface ITaskItemProps{
    task: ITask;
    taskRefetch: ITaskRefetchFC;
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
   

    //current user is the agreed participants
    const agreedParticipantIndex = taskParticipants.findIndex(participant => participant.participantUid === currentUserUid && participant.agreed && participant.isConfirmed);
    if(agreedParticipantIndex !== -1) return CurrentTaskUserTypeEnum.PARTICIPANT_AGREED;

    //current user is not confirmed
    const inConsiderationParticipantsIndex = taskParticipants.findIndex(participant => participant.participantUid === currentUserUid && !participant.isConfirmed);
    if(inConsiderationParticipantsIndex !== -1) return CurrentTaskUserTypeEnum.PARTICIPANT_NOT_CONFIRMED;

    return CurrentTaskUserTypeEnum.GUEST_LOGIN;
};


export const TaskItem:FC<ITaskItemProps> = ({
    task,
    taskRefetch
}) => {
    const { currentUser } = useContext(UserContext);
    const [ userType, setUserType ] = useState<CurrentTaskUserTypeEnum>();
    const [ userApplyIsLoading, setUserApplyIsLoading ] = useState<boolean>(false);
    const [ userQuitIsLoading, setUserQuitIsLoading ] = useState<boolean>(false);
    const [ isReachMax, setIsReachMax ] = useState<boolean>();
    const [ addParticipant ] = useMutation(ADDPARTICIPANT);
    const [ quitParticipant ] = useMutation(QUITPARTICIPANT);
    const { title, description, showImages, organizer } = task;
    console.log(task)


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
    },[currentUser, task])




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
            userType === CurrentTaskUserTypeEnum.GUEST_LOGIN?
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
            </RowCon>:
            undefined
        }
        {
            userType === CurrentTaskUserTypeEnum.PARTICIPANT_NOT_CONFIRMED?
            <RowCon>
                <CenterAlignCol span={24}>
                    <h2>You have submitted the application!</h2>
                </CenterAlignCol>
            </RowCon>:
            undefined
        }
        {
            userType === CurrentTaskUserTypeEnum.GUEST_WITHOUT_LOGIN?
            <RowCon>
                <CenterAlignCol span={24}>
                    <h2>Please log in first!</h2>
                </CenterAlignCol>
            </RowCon>:
            undefined
        }
        {
            userType === CurrentTaskUserTypeEnum.PARTICIPANT_AGREED?
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
            </RowCon>:
            undefined
        }
        {/* {
            userType === CurrentTaskUserTypeEnum.ORGNIZER?
            <RowCon>
                <CenterAlignCol span={24}>
                    <Button 
                        type="primary" 
                        htmlType="button"
                        disabled = {userQuitIsLoading}
                        onClick={ (e: any) => {quitOnClick();} }
                    >
                        Attend
                    </Button>
                </CenterAlignCol>
            </RowCon>:
            undefined
        } */}
        
        
    </TaskitemContainer>
   )
}
