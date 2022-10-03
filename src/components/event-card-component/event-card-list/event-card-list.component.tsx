import { FC } from 'react';
import { EventCard } from '../event-card/event-card.component';
import {
    ListContainer,
    ListItem,
    EventCardListCon, 
    ColContainer 
} from './event-card-list.styles';
import { 
    ITask
 } from '../../../interfaces/task.interface';
import { NumberLiteralType } from 'typescript';

const gridStyle = {
    gutter: 30,
    xs: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    xxl: 4,
};

const renderEventCard = (task: ITask) => (
    <ListItem>
        <EventCard task = {task}/>
    </ListItem>
)

interface EventCardListProps {
    tasks: ITask[];
}



export const EventCardList:FC<EventCardListProps> = ({
    tasks
}) => {

    return (
        <ListContainer
            grid={gridStyle}
            dataSource={tasks}
            renderItem= {renderEventCard}
        />
        // <EventCardListCon>
        //     <Row align = 'middle' justify = 'center' gutter= {gutter as [Gutter, Gutter]}>
        //             {
        //                 tasks.map((task, index)=>{
        //                     return <ColContainer key = {index} {...spanObj}><EventCard task = {task}/></ColContainer>
        //                 })
        //             }
        //     </Row>
        // </EventCardListCon>
    )
}
