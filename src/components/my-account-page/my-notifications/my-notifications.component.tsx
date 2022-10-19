
import { useContext } from 'react';
import { UserContext } from '../../../context/user.context';
import { MyNotificationsCon } from './my-notifications.styles';
import {
    FC, 
} from 'react';

import {
    AddTaskRequestEnum,
    QuitTaskRequestEnum,
    NotificationTypes,
    // IPaticipantsNotification,
    NotificationTypeEnum
} from '../../../interfaces/notifications.interface';

import { Spin } from 'antd';
import { Outlet } from 'react-router-dom';

/* eslint-disable max-len */
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


interface IAccountNotificationProps {
    notifications: NotificationTypes[];
}



const MyNotifications = () => {
    const {currentUser} = useContext(UserContext);
    console.log('notifications:', currentUser)
    if(!currentUser) return <Spin />
    return (
        <MyNotificationsCon>
            <div>My Notifications</div>
            <Outlet/>
        </MyNotificationsCon>
    )
}

export default MyNotifications;