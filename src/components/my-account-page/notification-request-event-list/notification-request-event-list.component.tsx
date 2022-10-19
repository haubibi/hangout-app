import {
    useState,
    FC,
    useCallback,
    useEffect
} from 'react';
import { 
    NotificationList,
    NotificationRequestEventListCon,
    EmptyCon
 } from './notification-request-event-list.styles'
import InfiniteScroll from 'react-infinite-scroll-component';
import { ITask } from '../../../interfaces/task.interface';
import { Divider } from 'antd';
import { NotificationRequestEventItem } from '../notification-request-event-item/notification-request-event-item.component';

interface INotificationRequestEventListProps {
    tasks: ITask[],
    onTaskSelectedChange: (taskId: string) => void;
}

const startCount = 1;
const addStep = 10;

export const NotificationRequestEventList:FC<INotificationRequestEventListProps> = ({
    tasks,
    onTaskSelectedChange
}) => {
    const [scollCount, setScollCount] = useState<number>(startCount);
    const [showTasks, setShowTasks] = useState<ITask[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string>();

    const taskListItemOnClick = useCallback((taskId: string)=>{
        setActiveTaskId(taskId);
    },[]);
    console.log("activeTaskId:", activeTaskId)

    //set the active task
    useEffect(()=>{
        if(!activeTaskId && showTasks && showTasks.length>0){
            setActiveTaskId(showTasks[0].id);
        }
    },[activeTaskId, showTasks]);

    //set the showTasks
    useEffect(()=>{
        setShowTasks(tasks.slice(0, startCount* addStep))
    },[scollCount, setShowTasks, tasks]);


    //pass the active task id
    useEffect(()=>{
        onTaskSelectedChange(activeTaskId);
    },[activeTaskId, onTaskSelectedChange]);

    const loadMoreData = useCallback(()=>{
        setScollCount(scollCount + 1);
    },[setScollCount, scollCount]);

    return ( 
        <NotificationRequestEventListCon>
            {
                showTasks.length === 0 ?
                <EmptyCon  description={<span> No Event</span>} />:
                <InfiniteScroll
                    dataLength={ startCount * addStep }
                    loader={ null }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    hasMore
                    next = { loadMoreData }
                >
                    <NotificationList
                        dataSource = {showTasks}
                        renderItem = {(task) => <NotificationRequestEventItem active = {activeTaskId === (task as ITask).id} task = {task as ITask} taskListItemOnClick = {taskListItemOnClick}/>}
                    >

                    </NotificationList>
                </InfiniteScroll>
            }
            
        </NotificationRequestEventListCon>
    )
}