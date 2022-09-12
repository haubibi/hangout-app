import { FC } from 'react';
import { EventCard } from '../event-card/event-card.component';
import { EventCardListCon, ColContainer } from './event-card-list.styles';
import { ITask } from '../../utils/interfaces/task.interface';
import { spanObj, gutter } from '../../utils/layout-antdesign/layout';
import {
    Row
} from 'antd';
import { Gutter } from 'antd/lib/grid/row';

interface EventCardListProps {
    tasks: ITask[]
}



export const EventCardList:FC<EventCardListProps> = ({
    tasks
}) => {

    

    return (
        <EventCardListCon>
            <Row align = 'middle' justify = 'center' gutter= {gutter as [Gutter, Gutter]}>
                    {
                        tasks.map((task, index)=>{
                            return <ColContainer key = {index} {...spanObj}><EventCard task = {task}/></ColContainer>
                        })
                    }
            </Row>
        </EventCardListCon>
    )
}
