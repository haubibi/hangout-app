import {
    FC
} from 'react';
import {
    UserOutlined
} from '@ant-design/icons';
import {
    SpanH3,
    SpanAttendee,
    TaskAttendeeCon,
    DivAttendee,
    SpanNumber
} from './task-attendee.styles';

export interface ITaskAttendeeProps {
    currentAttendees: number;
    maxAttendees: number;
}

export const TaskAttendee: FC<ITaskAttendeeProps> = ({
    currentAttendees,
    maxAttendees,
}) =>{


    return (
        <TaskAttendeeCon>
            <SpanH3><UserOutlined /> Attendees</SpanH3>
            <DivAttendee>
                <SpanAttendee> 
                    current attendees 
                    {
                        currentAttendees < maxAttendees ?
                            <SpanNumber> {`${currentAttendees}`}</SpanNumber>:
                            null
                    }
                    ,
                    {
                        currentAttendees < maxAttendees ?
                            <SpanAttendee> still </SpanAttendee>:
                            null
                    }
                    {
                        currentAttendees < maxAttendees ?
                            <SpanNumber>{`${maxAttendees - currentAttendees}`}</SpanNumber>:
                            null
                    }
                    {
                        currentAttendees < maxAttendees ?
                            <SpanAttendee> left, apply now!</SpanAttendee>:
                            <SpanAttendee> are full.</SpanAttendee>
                    }
                </SpanAttendee>
            </DivAttendee>
        </TaskAttendeeCon>
    )
}