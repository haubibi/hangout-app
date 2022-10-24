import {
    FC
} from 'react';
import {
    TaskTimeLocationAttendeeCon,
} from './task-time-location-attendee.styles';
import { TaskTime, ITaskTimeProps } from '../task-time/task-time.component';
import { TaskLocation  } from '../task-location/task-location.component';
import { ILatLngAndAddress } from '../../../interfaces/google.interface';
import { TaskAttendee, ITaskAttendeeProps } from '../task-attendee/task-attendee.component';

export interface ITaskTimeLocationAttendeeProps {
    dateAndTime: ITaskTimeProps;
    location: ILatLngAndAddress['address'];
    attendee: ITaskAttendeeProps;
}

export const TaskTimeLocationAttendee:FC<ITaskTimeLocationAttendeeProps> = ({
    dateAndTime,
    location,
    attendee
}) =>{

    const { startTime, startDate, endTime, endDate} = dateAndTime;

    return (
        <TaskTimeLocationAttendeeCon>
            <TaskTime 
                startDate = {startDate}
                startTime = {startTime}
                endDate = {endDate}
                endTime = {endTime}
            />
            <TaskLocation
                location = {location}
            />
            <TaskAttendee
                currentAttendees = {attendee.currentAttendees}
                maxAttendees = {attendee.maxAttendees}
            />
        </TaskTimeLocationAttendeeCon>
    )
}