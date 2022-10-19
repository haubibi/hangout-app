import { Moment } from 'moment';
export type ITimeString = string | undefined;
export type ITimeMoment = Moment | undefined;

export interface ITaskInputTimeMoment {
    startDate:Moment | undefined;
    startTime:Moment | undefined;
    endDate:Moment | undefined;
    endTime:Moment | undefined; 
}

export interface ITaskInputTimeString {
    startDate:string | undefined;
    startTime:string | undefined;
    endDate:string| undefined;
    endTime:string| undefined;
}

export type DateRangeValueType = [Moment | null, Moment | null] | null;
