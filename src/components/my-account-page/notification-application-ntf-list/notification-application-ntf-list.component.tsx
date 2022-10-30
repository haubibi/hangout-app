import { 
    FC
} from 'react';
import { 
    ListCon,
    EmptyCon
 } from './notification-application-ntf-list.styles'
import { ApplicationNotificationType } from '../../../interfaces/notifications.interface';
import { NotifiCationApplicationNtfItem } from '../notification-application-ntf-item/notification-application-ntf-item';

interface INotifiCationApplicationNtfListProps {
    notifications: ApplicationNotificationType[];
}

export const NotifiCationApplicationNtfList:FC<INotifiCationApplicationNtfListProps> = ({
    notifications,
}) =>{

    // console.log(`notifications:`, notifications)
    return (
        notifications && notifications.length === 0 ?
        <EmptyCon  description={<span> No Notification</span>} />:
        <ListCon 
            dataSource={notifications}
            renderItem = {(item: ApplicationNotificationType) => <NotifiCationApplicationNtfItem notification={ item }/>}
        />
    )
}