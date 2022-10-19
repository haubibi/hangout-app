import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK_BY_ID } from '../../../utils/graphql/query.utils';
import {
    FC,
    useEffect,
    useState,
    useContext
 } from 'react';
import { 
    NotificationApplicationListItem,
    TextDiv,
    EventLink,
    ConfirmButton
 } from './notification-application-ntf-item.styles';
import { 
    ApplicationNotificationType,
    AddTaskRequestEnum
} from '../../../interfaces/notifications.interface';
import { Spin, message } from 'antd';
import { ITask } from '../../../interfaces/task.interface';
import { useCallback } from 'react';
import { DELETE_APPLICATION_NTNOTIFICATION } from '../../../utils/graphql/mutation.utils';
import { UserContext } from '../../../context/user.context';
import { getNotificationDate } from '../../../utils/date/date.utils';
import { NotificationDivider, NotificationTimeDiv } from '../notification-request-ntf-item/notification-request-ntf-item.styles';

interface INotificationApplicationItemProps {
    notification: ApplicationNotificationType
}


export const NotifiCationApplicationNtfItem:FC<INotificationApplicationItemProps> = ({
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
    const [deleteApplicationNotification] = useMutation(DELETE_APPLICATION_NTNOTIFICATION);
    const ntfDate = getNotificationDate(notification.time);
    useEffect(()=>{
        if(data && data.getTaskById) {
            setTask(data.getTaskById)
        }
    },[data])



    const confirmButtonOnClick = useCallback(async ()=>{
        setButtonDisabled(true);
        deleteApplicationNotification({
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
    },[deleteApplicationNotification, participantUid, taskId, organizerUid, refetchUser]);

    if(error) return null;
    if(loading || !task ) return <Spin />;

    return (
        <>
            <NotificationApplicationListItem
                actions={[
                    <ConfirmButton type='primary' htmlType='button' disabled = {buttonDisabled} onClick={confirmButtonOnClick}>confirm</ConfirmButton>
                ]}
            >
                {
                    type === AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST?
                    <TextDiv>You have successfully attended the event <EventLink to = {`/task_${task.id}`}>{task.title}.</EventLink></TextDiv>:
                    <TextDiv>Your application to attend the event <EventLink to = {`/task_${task.id}`}>{task.title}</EventLink> has been rejected.</TextDiv>
                }
                <NotificationTimeDiv>{ntfDate}</NotificationTimeDiv>
            </NotificationApplicationListItem>
            <NotificationDivider></NotificationDivider>
        </>
    )
}
