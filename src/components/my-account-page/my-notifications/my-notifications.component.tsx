
import { useContext } from 'react';
import { UserContext } from '../../../context/user.context';
import { MyNotificationsCon } from './my-notifications.styles';
import {
    FC, 
    ReactElement
} from 'react';
import { NotificationParticipant } from '../../notification-component/notification-participant/notification-participant.component';
import {
    SpanCon,
    ListCon,
    ListItem,
} from './my-notifications.styles';
import {
    AddTaskRequestEnum,
    QuitTaskRequestEnum,
    NotificationTypes,
    // IPaticipantsNotification,
    NotificationTypeEnum
} from '../../../interfaces/notifications.interface';

import { Spin } from 'antd';


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


// // eslint-disable-next-line max-len
// export type NotificationTypes = IPaticipantsNotification;




interface IAccountNotificationProps {
    notifications: NotificationTypes[];
}



const MyNotifications = () => {
    const {currentUser} = useContext(UserContext);
    console.log('notifications:', currentUser)
    if(!currentUser) return <Spin />
    return (
        <MyNotificationsCon>
            My Notifications
            {/* {
                (currentUser.notifications && currentUser.notifications.length > 0) ?
                <ListCon
                    dataSource = {currentUser.notifications}
                    renderItem = {renderNotification}
                />:
                <h2>You don't have notifications</h2>
            }
             */}
            {/* <EventCardList /> */}
        </MyNotificationsCon>
    )
}

export default MyNotifications;