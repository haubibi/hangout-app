import {
    FC,
    useCallback,
} from 'react';
import {
     ListItem,
     ListItemMeta
} from './notification-request-event-item.styles'
import { ITask } from '../../../interfaces/task.interface';
import { Avatar} from 'antd';

interface INotificationRequestEventItemProps {
    task: ITask;
    active: boolean;
    taskListItemOnClick:(taskId: string)=>void;
}

const defaultImageSrc = require('../../../assets/eventc-card-front-cover/frontCover_default.jpg');


export const NotificationRequestEventItem:FC<INotificationRequestEventItemProps> = ({
    task,
    taskListItemOnClick,
    active
}) => {

    const onClickHandle = useCallback(()=>{
        taskListItemOnClick(task.id);
    },[taskListItemOnClick, task])
    // console.log("active:", active)
    return ( 
        <ListItem
            key = {task.id}
            className= {`${active?"active":"inactive"}`}
            onClick = {onClickHandle}
        >
            <ListItemMeta
                avatar={<Avatar shape = "circle" size = "large" src={task.frontCoverImage?task.frontCoverImage.url:defaultImageSrc} />}
                title={<span>{task.title}</span>}
                description={task.description}
            />    
        </ListItem>
    )
}