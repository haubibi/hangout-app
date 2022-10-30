import {
    FC, 
    useState,
    useEffect,
    useContext
} from 'react';
import { 
    ListItem,
    ListItemMeta,
    NotificationDivider,
    NotificationTimeDiv
} from './notification-request-ntf-item.styles'
import { RequestNotificationType, AddTaskRequestEnum } from '../../../interfaces/notifications.interface';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../../../utils/graphql/query.utils';
import { UserAvatarPopover } from '../../user-avatar/user-avatar-popover/user-avatar-popover.component';
import { 
    Spin,
    Button,
 } from 'antd';
import { IUser } from '../../../interfaces/user.interface';
import { useCallback } from 'react';
import { ADD_PARTICIPANT } from '../../../utils/graphql/mutation.utils';
import { UserContext } from '../../../context/user.context';
import { getNotificationDate } from '../../../utils/date/date.utils';
import { message } from 'antd';

interface INotifiCationRequestNtfItemProps {
    notification: RequestNotificationType;
    argeeDisabled:boolean;
}

export const NotifiCationRequestNtfItem:FC<INotifiCationRequestNtfItemProps> = ({
    notification,
    argeeDisabled
}) =>{
    const { refetchUser } = useContext(UserContext);
    const { participantUid, taskId, organizerUid} = notification;
    const [ paricipant, setPariticiPant] = useState<IUser >();
    const [ buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const { data, error, loading} = useQuery(GET_USER,{
        variables:{
            uid: participantUid
        }
    });
    const addParticipant= useMutation(ADD_PARTICIPANT)[0];
    const ntfDate = getNotificationDate(notification.time);

    //get the participant
    useEffect(()=>{
        if(data && data.getUserById) {
            setPariticiPant(data.getUserById);
        }
    },[data]);


    const agreeOnClikHandle = useCallback(async ()=>{
        setButtonDisabled(true);
        addParticipant({
            variables: {
                participantUid,
                taskId,
                addTaskRequestType: AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST,
            }
        }).then(()=>{
            refetchUser({
                uid: organizerUid
            });
            setButtonDisabled(false);
        }).catch(error => {
            message.destroy();
            message.error(error, 3);
            setButtonDisabled(false);
        });
    },[participantUid, taskId, addParticipant, organizerUid, refetchUser]);

    const rejectOnClikHandle = useCallback(async ()=>{
        setButtonDisabled(true);
        addParticipant({
            variables: {
                participantUid,
                taskId,
                addTaskRequestType: AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST,
            }
        }).then(()=>{
            // console.log(1111111)
            refetchUser({
                uid: organizerUid
            });
            setButtonDisabled(false);
        }).catch(error => {
            message.destroy();
            message.error(error, 3);
            setButtonDisabled(false);
        });
    },[participantUid, taskId, addParticipant, organizerUid, refetchUser]);


    if( error ) return null;
    if( loading || !paricipant) return <Spin />;


    return (
        <>
            <ListItem
                key = {taskId}
                actions = {[
                    <Button htmlType='button' type = "primary" disabled = {argeeDisabled && buttonDisabled} onClick = {agreeOnClikHandle}>agree</ Button>,
                    <Button htmlType='button' type = "primary" disabled = {buttonDisabled} onClick = {rejectOnClikHandle} >reject</ Button>
                ]}
                
            >
                <ListItemMeta
                    avatar={<UserAvatarPopover user = {paricipant}/>}
                    title={<span>{paricipant.displayName}</span>}
                    description={`has sent you an event application.`}

                />
                <NotificationTimeDiv>{ntfDate}</NotificationTimeDiv>
            </ListItem>
            <NotificationDivider></NotificationDivider>
        </>
    )
}