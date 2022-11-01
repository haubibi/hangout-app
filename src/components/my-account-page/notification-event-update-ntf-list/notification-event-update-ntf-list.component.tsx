import { 
    FC
} from 'react';
import { 
    ListCon,
    EmptyCon
 } from './notification-event-update-ntf-list.styles'
import { TaskUpdateNotificationType } from '../../../interfaces/notifications.interface';
import { NotifiCationEventUpdateNtfItem } from '../notification-event-update-ntf-item/notification-event-update-ntf-item.component';

interface INotifiCationEventUpdateNtfListProps {
    notifications: TaskUpdateNotificationType[];
}

export const NotifiCationEventUpdateNtfList:FC<INotifiCationEventUpdateNtfListProps> = ({
    notifications,
}) =>{
    return (
        notifications && notifications.length === 0 ?
        <EmptyCon  description={<span> No Notification</span>} />:
        <ListCon 
            dataSource={notifications}
            renderItem = {(item: TaskUpdateNotificationType) => <NotifiCationEventUpdateNtfItem notification={ item }/>}
        />
    )
}