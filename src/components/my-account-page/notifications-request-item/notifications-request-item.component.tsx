
import {
    useState, 
    useContext,
    useEffect,
    FC
 } from 'react';
import { 
    NotificationRequestListItem,
    NotificationRequestListItemMeta
 } from './notifications-request-item.styles';
import { RequestNotificationType } from '../../../../functions/src/interfaces/notifications.interface';
import { GET_USER, GET_TASK_BY_ID } from '../../../utils/graphql/query.utils';
import { useQuery } from '@apollo/client';
import { IUser } from '../../../interfaces/user.interface';
import { UserAvatarBase } from '../../user-avatar/user-avatar-base/user-avatar-base.component';
import { Spin } from 'antd';

interface INotificationRequestItemProps {
    notification: RequestNotificationType
}
export const NotificationRequestItem:FC<INotificationRequestItemProps> = ({
    notification
}) => {
    const [ sender, setSender] = useState<IUser>();
    const taskQuery = useQuery(GET_TASK_BY_ID,{
        variables: {
            id: notification.taskId
        }
    });
    const participantQuery = useQuery(GET_USER,{
        variables: {
            uid: notification.participantUid
        }
    });
    //get the sender
    useEffect(()=>{
        const {data} = participantQuery;
        if(data && data.getUserById) {
            setSender(data.getUserById);
        }
    },[participantQuery]);
    //get the task
    useEffect(()=>{
        const {data} = participantQuery;
        if(data && data.getUserById) {
            setSender(data.getUserById);
        }
    },[participantQuery]);

    if (participantQuery.error || taskQuery.error) return null;
    if (!sender) return <Spin />;
    return (
        <NotificationRequestListItem>
            <NotificationRequestListItemMeta
                avatar = {<UserAvatarBase userAvatarImg = {sender?.avatarImg}/>}
                title = {sender?.displayName}
                description = {
                    <div> applied to attend the event</div>
                }
            />
        </NotificationRequestListItem>
    )
}

