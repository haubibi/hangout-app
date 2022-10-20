import { FC } from 'react';
import { EventCard } from '../event-card/event-card.component';
import {
    ListContainer,
    ListItem,
    EventCardListCon, 
} from './event-card-list.styles';
import { 
    ITask,
    TaskRefetchType,
 } from '../../../interfaces/task.interface';

import { OperationVariables } from '@apollo/client';
const gridStyle = {
    gutter: 0,
    xs: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    xxl: 4,
};

export const renderEventCard = (task: ITask) => (
    <ListItem>
        <EventCard task = {task}/>
    </ListItem>
)

interface EventCardListProps {
    tasks: ITask[];
    tasksRefetch: TaskRefetchType<OperationVariables>
}



export const EventCardList:FC<EventCardListProps> = ({
    tasks,
    tasksRefetch
}) => {

    return (
        <ListContainer
            grid={gridStyle}
            dataSource={tasks}
            renderItem= {renderEventCard}
        />
    )
}
