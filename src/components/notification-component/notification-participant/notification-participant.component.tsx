import {
    FC,
    useEffect,
    useState,
    ReactElement
} from 'react';
import { useQuery } from '@apollo/client';
import { GETPARTICIPANTNOTIFICATION } from '../../../utils/graphql/query.utils';
import { notification } from 'antd';
import {
    NotificationParticipantsCon,
    UserSpanCon,
    TextSpanCon
} from './notification-participant.styles';

import {
    AddTaskRequestEnum,
    QuitTaskRequestEnum,
    IPaticipantsNotification,
    ParticipantNotification
} from '../../../interfaces/notifications.interface';
import { 
    Spin, 
    message,
} from 'antd';

interface INotificationParticipantsProps {
    notification: IPaticipantsNotification
}



// export enum AddTaskRequestEnum {
//     PARTICIPANT_APPLY_REQUEST = "PARTICIPANT_APPLY_QEQUEST",
//     PARTICIPANT_ARGEE_REQUEST = "PARTICIPANT_ARGEE_REQUEST",
//     PARTICIPANT_REFUSE_REQUEST = "PARTICIPANT_REFUSE_REQUEST",
//     ORGANIZER_APPLY_REQUEST = "ORGANIZER_APPLY_REQUEST",
//     ORGANIZER_ARGEE_REQUEST = "ORGANIZER_ARGEE_REQUEST",
//     ORGANIZER_REFUSE_REQUEST = "ORGANIZER_REFUSE_REQUEST",
// }

// export enum QuitTaskRequestEnum {
//     PARTICIPANT_QUIT_REQUEST = "PARTICIPANT_QUIT_REQUEST",
// }


// export interface IPaticipantsNotification {
//     type: AddTaskRequestEnum | QuitTaskRequestEnum;
//     taskId: string;
//     participantUid: string;
//     organizerUid: string;
//     read: boolean;
// }
// export const GETPARTICIPANTNOTIFICATION = gql`
//     query(
//       $participantUid:ID,
//       $taskId:ID,
//       $organizerUid:ID,
//     ){
//       getParticipantNotification (
//         taskId:$taskId
//         participantUid:$participantUid
//         organizerUid:$organizerUid
//       ) {
//           ${participantNotificationObj}
//       }
//     }
// `;
// export interface ParticipantNotification{
//     task: ITask;
//     participant: IUser;
//     organizer: IUser;
// }
interface INotificationFormat {
    firstUserName: string;
    secondUserName: string;
    textBetweentUsers: string;
    textBetweentUserAndTask: string;
    taskTitle: string;
}

interface INotificationFormatInput {
    notification: IPaticipantsNotification;
    participantNotification: ParticipantNotification;
}

const getNotificationsFormat = (
    notificationFormatInput: INotificationFormatInput
):INotificationFormat => {
    const {notification, participantNotification} = notificationFormatInput;
    let firstUserName:string;
    let secondUserName:string;
    let textBetweentUsers:string;
    let textBetweentUserAndTask:string;
    let taskTitle:string;
    const {task, participant, organizer} = participantNotification;
    switch(notification.type){
        case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
            firstUserName = participant.displayName;
            textBetweentUsers = '';
            secondUserName = '';
            textBetweentUserAndTask = 'apply to join event';
            taskTitle = task.title;
            break;
        case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
            firstUserName = organizer.displayName;
            textBetweentUsers = 'has agreed you';
            secondUserName = '';
            textBetweentUserAndTask = 'to join event';
            taskTitle = task.title;
            break;
        case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
            firstUserName = organizer.displayName;
            textBetweentUsers = 'has rejected your request';
            secondUserName = '';
            textBetweentUserAndTask = 'to join event';
            taskTitle = task.title;
            break;
            
    }

    return {
        firstUserName,
        secondUserName,
        textBetweentUsers,
        textBetweentUserAndTask,
        taskTitle,
    }
}



export const NotificationParticipant:FC<INotificationParticipantsProps> = ({
    notification
}) =>{
    const [participantNotification, setParticipantNotification] = useState<ParticipantNotification>();
    const [notificationFormat, setNotificationFormat] = useState<INotificationFormat>();
    const {taskId, participantUid, organizerUid} = notification;
    const {data, loading, error} = useQuery(GETPARTICIPANTNOTIFICATION,{
        variables: {
            participantUid,
            organizerUid,
            taskId,
        }
    });

    console.log("loading:",loading)
    console.log("error:",error)
    console.log("data:",data)

    useEffect(()=>{
        if(data && data.getParticipantNotification){
            setParticipantNotification(data.getParticipantNotification);
        }
    },[data]);
    useEffect(()=>{
        if(participantNotification) {
            const notificationFormatInput:INotificationFormatInput = {
                notification,
                participantNotification
            };
            const notificationFormat = getNotificationsFormat(notificationFormatInput);
            console.log('notificationFormat:', notificationFormat)
            setNotificationFormat(notificationFormat);
        }
    },[participantNotification,notification]);
    
    console.log(participantNotification)
    if (loading || !participantNotification || !notificationFormat) return <Spin />;
    if (error) {message.error({content: error}); return <Spin />;};
    return(
        <NotificationParticipantsCon>
            
        </NotificationParticipantsCon>
    )
}