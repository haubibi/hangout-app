
import { 
    useContext,
    useEffect,
    useState
 } from 'react';
import { 
    NotificationEventUpdatePageContainer
} from './notifications-event-page.styles';
import { 
    NavigationContext,
    MyAccountMenuKey
 } from '../../../context/navigation.context';
import { UserContext } from '../../../context/user.context';
import { message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { TaskUpdateNotificationType } from '../../../interfaces/notifications.interface';
import { NotifiCationEventUpdateNtfList } from '../notification-event-update-ntf-list/notification-event-update-ntf-list.component'; 
import { sortNotificationsByTime } from '../../../utils/notification/notifications.utils';

const NotificationApplicationPage = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { currentUser, refetchUser } = useContext(UserContext);
    const [ notifications, setNotifications] = useState<TaskUpdateNotificationType[]>();

    //set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MyAccountMenuKey.NOTIFICATIONS_EVENT_UPDATE);
    },[setCurrentMenuKey]);

    // //check the current user
    // useEffect(()=> {
    //     if (!currentUser) {
    //         message.info(`Please log in first!`);
    //         navigate(`/logIn`,{state:{pathname}});
    //     } else {
    //         message.destroy();
    //     }
    // },[currentUser, navigate, pathname]);

    //  //refetchUser
    //  useEffect(()=> {
    //     if (currentUser) {
    //         refetchUser({
    //             uid: currentUser.uid
    //         });
    //     }
    // },[currentUser, refetchUser]);
    //set the application notifications
    useEffect(()=> {
        if (currentUser) {
            console.log(`current user`, currentUser)
            const notifications = currentUser?.notifications?.taskUpdateNotification || [];
            setNotifications(sortNotificationsByTime(notifications));
        }
    },[currentUser, setNotifications]);



    return (
        <NotificationEventUpdatePageContainer>
            <NotifiCationEventUpdateNtfList notifications={ notifications }/>
        </NotificationEventUpdatePageContainer>
    )
}

export default NotificationApplicationPage;