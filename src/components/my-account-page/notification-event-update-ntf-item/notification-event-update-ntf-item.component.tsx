import { IUser } from '../../../interfaces/user.interface';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER, GET_TASK_BY_ID } from '../../../utils/graphql/query.utils';
import { UserAvatarBase } from '../../user-avatar/user-avatar-base/user-avatar-base.component';
import {
    FC,
    useEffect,
    useState,
    useContext
 } from 'react';
import { 
    NotificationEventUpdateListItem,
    TextDiv,
    EventLink,
    ConfirmButton
 } from './notification-event-update-ntf-item.styles';
import { 
    TaskUpdateNotificationType,
    UpdateTaskEnum
} from '../../../interfaces/notifications.interface';
import { Spin, message } from 'antd';
import { ITask } from '../../../interfaces/task.interface';
import { useCallback } from 'react';
import { DELETE_EVENT_UPDATE_NTNOTIFICATION } from '../../../utils/graphql/mutation.utils';
import { UserContext } from '../../../context/user.context';

interface INotificationApplicationItemProps {
    notification: TaskUpdateNotificationType
}


export const NotifiCationEventUpdateNtfItem:FC<INotificationApplicationItemProps> = ({
    notification
}) => {
    const { refetchUser } = useContext(UserContext);
    const [ buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const { taskId, participantUid, organizerUid, type} = notification;
    const { data, error, loading } = useQuery(GET_TASK_BY_ID,{
        variables: {
            id: notification.taskId
        }
    });
    const [task, setTask] = useState<ITask>();
    const [deleteEventUpdateNotification] = useMutation(DELETE_EVENT_UPDATE_NTNOTIFICATION);

    useEffect(()=>{
        if(data && data.getTaskById) {
            setTask(data.getTaskById)
        }
    },[data])



    const confirmButtonOnClick = useCallback(()=>{
        setButtonDisabled(true);
        deleteEventUpdateNotification({
            variables: {
                participantUid,
                taskId,
                organizerUid
            }
        })
        .then(()=>{
            refetchUser({
                uid: participantUid
            });
            setButtonDisabled(false);
        })
        .catch(error => {
            message.destroy();
            message.error(error, 3);
            setButtonDisabled(false);
        });
    },[deleteEventUpdateNotification, participantUid, taskId, organizerUid, refetchUser]);

    if(error) return null;
    if(loading || !task ) return <Spin />;

    return (
        <NotificationEventUpdateListItem
            actions={[
                <ConfirmButton type='primary' htmlType='button' onClick={confirmButtonOnClick}>confirm </ConfirmButton>
            ]}
        >

            {
                (() =>{
                    switch(type){
                        case UpdateTaskEnum.TASK_UPDATE:
                            return <TextDiv>Event <EventLink to = {`/task_${task.id}`}>{task.title} </EventLink> has updated.</TextDiv>;
                        case UpdateTaskEnum.TASK_DELETE:
                            return <TextDiv>{`Event ${notification.taskTitle} has been deleted.`}</TextDiv>;
                            default: return null;
                            
                    }
                })()
            }
            
        </NotificationEventUpdateListItem>
    )
}
