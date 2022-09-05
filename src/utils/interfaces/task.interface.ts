import { IUser,IReview } from './user.interface';
import { Moment } from 'moment';
import { LatLngLiteral } from './google.interface'

export type TaskStatus = 'open' | 'closed';

export interface ITaskBase {
    id: string;
    title: string;
    organizer: IUser;
    participantsNumber: number;
    location: LatLngLiteral;
}
export interface ITaskInputMoment extends ITaskBase{
    startDate:Moment;
    startTime:Moment;
    endDate:Moment;
    endTime:Moment;
    
}
export interface ITaskInputString extends ITaskBase{
    startDate:string;
    startTime:string;
    endDate:string;
    endTime:string;
}


export interface ITask extends ITaskBase {
    startDate:string;
    startTime:string;
    endDate:string;
    endTime:string;
    participants: IUser[];
    reviews: IReview[];
    hide: boolean;
    status: TaskStatus;
}