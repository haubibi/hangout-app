import { 
    FC,
    useState,
    useCallback,
    useEffect
} from 'react';
import { 
    ListCon,
    EmptyCon,
    InfiniteScrollCon
 } from './notification-request-ntf-list.styles'
import { RequestNotificationType } from '../../../interfaces/notifications.interface';
import { NotifiCationRequestNtfItem } from '../notification-request-ntf-item/notification-request-ntf-item.component';
import { Divider } from 'antd';

interface INotifiCationRequestNtfListProps {
    notifications: RequestNotificationType[];
    isAttendeesMax:boolean;
}
const startCount = 1;
const addStep = 10;
export const NotifiCationRequestNtfList:FC<INotifiCationRequestNtfListProps> = ({
    notifications,
    isAttendeesMax
}) =>{

    const [scollCount, setScollCount] = useState<number>(startCount);
    const [ showNotifications, setShowNotifications] = useState<RequestNotificationType[]>([]);

    //set the showTasks
    useEffect(()=>{
        setShowNotifications(notifications.slice(0, startCount* addStep))
    },[scollCount, setShowNotifications, notifications]);


    const loadMoreData = useCallback(()=>{
        setScollCount(scollCount + 1);
    },[setScollCount, scollCount]);

    return (
            Array.isArray(notifications) && notifications.length === 0 ?
            <EmptyCon  description={<span> No Notification</span>} />:
            <InfiniteScrollCon
                dataLength={ startCount * addStep }
                loader={ null }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                hasMore
                next = { loadMoreData }
            >
                <ListCon 
                    dataSource={notifications}
                    renderItem = {(item: RequestNotificationType) => <NotifiCationRequestNtfItem notification={ item } argeeDisabled = {isAttendeesMax}/>}
                />
            </InfiniteScrollCon>
    )
}