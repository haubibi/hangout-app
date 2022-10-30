
import { 
    useContext,
    useEffect,
    useState
} from 'react';
import { 
    NotificationRequestPageContainer,
    Rowpage,
    ColEventList,
    ColNotificationList
 } from './notifications-request-page.styles';
import { 
    NavigationContext,
    MyAccountMenuKey
} from '../../../context/navigation.context';
import { UserContext } from '../../../context/user.context';
import { TasksContext } from '../../../context/tasks.context';
import { Spin } from 'antd';
import { RequestNotificationType } from '../../../interfaces/notifications.interface';
import { ITask } from '../../../interfaces/task.interface';
import { getMyTasks } from '../../../utils/task/task.filter';
import { NotificationRequestEventList } from '../notification-request-event-list/notification-request-event-list.component';
import { useCallback } from 'react';
import { getRequestNotificationsByTask,sortNotificationsByTime } from '../../../utils/notification/notifications.utils';
import { checkIfTaskAttendeesReachMax } from '../../../utils/task/task.utils';
import { NotifiCationRequestNtfList } from '../notification-request-ntf-list/notification-request-ntf-list.component';

const NotificationRequestPage = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const [ activeTaskId, setActiveTaskId] = useState<string>();
    const { currentUser } = useContext(UserContext);
    const { allTasks, refetchAllTasks } = useContext(TasksContext);
    const [ myTasks, setMyTasks] = useState<ITask[]>([]);
    const [ isAttendeesMax, setIsAttendeesMax] = useState<boolean>(false);
    const [ notifications, setNotifications] = useState<RequestNotificationType[]>([]);

     //set the menu key
     useEffect(()=> {
        setCurrentMenuKey(MyAccountMenuKey.NOTIFICATIONS_REQUEST);
    },[setCurrentMenuKey]);

    //refetch tasks
    useEffect(()=> {
        refetchAllTasks();
    },[refetchAllTasks]);


     //get All my tasks
     useEffect(()=>{
        if(allTasks && currentUser) {
            const myTasks = getMyTasks({
                type: "organize",
                userUid: currentUser.uid,
                tasks : allTasks,
                taskStatus: 'withinDate',
                sortByDate: true
            });
            setMyTasks(myTasks);
        }
     },[allTasks, currentUser])

    //set the application notifications
    useEffect(()=> {
        if (currentUser && activeTaskId) {
            const notifications = currentUser?.notifications?.requestNotification || [];
            // console.log(`currentUser:`, currentUser)
            // console.log(`notifications:`, notifications)
            const requestNotificationOfTheTask = getRequestNotificationsByTask(activeTaskId, notifications);
            setNotifications(sortNotificationsByTime(requestNotificationOfTheTask));
        }
    },[currentUser, setNotifications, activeTaskId]);

    //check if the attendees reach maximum
    useEffect(()=>{
        const activeTask = myTasks[myTasks.findIndex(task => task.id === activeTaskId)];
        if(activeTask) {
            const ifReachMaxAttendees = checkIfTaskAttendeesReachMax(activeTask);
            setIsAttendeesMax(ifReachMaxAttendees);
        }
    },[activeTaskId,myTasks]);
    

    const onTaskSelectedChange = useCallback((taskId)=>{
        setActiveTaskId(taskId);
    },[setActiveTaskId]);

    // console.log("currentUser:", currentUser);
    // console.log("myTasks:", myTasks);
    if(!myTasks) return <Spin />;

    return (
        <NotificationRequestPageContainer>
            <Rowpage>
                <ColEventList>
                    <NotificationRequestEventList 
                        tasks={myTasks} 
                        onTaskSelectedChange = {onTaskSelectedChange}
                    />
                </ColEventList>
                <ColNotificationList>
                    <NotifiCationRequestNtfList 
                        notifications={notifications}
                        isAttendeesMax = {isAttendeesMax}
                    />
                </ColNotificationList>
            </Rowpage>
        </NotificationRequestPageContainer>
    )
}

export default NotificationRequestPage;