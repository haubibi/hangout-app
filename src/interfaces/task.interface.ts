/* eslint-disable max-len */
import {IReview} from "./review.interface";
import {IRate} from "./rate.interface";
import {ITaskInputTimeMoment, ITaskInputTimeString} from "./time.interface";
import {ILatLngAndAddress} from "./google.interface";
import {TaskImagesWithUrlAndRefPath} from "./images.interface";
import {IPaticipant} from "./participate.interface";
import { ApolloQueryResult } from "@apollo/client";
import { DateRangeValueType } from '../interfaces/time.interface';
import { LatLngLiteral } from "./google.interface";

export type EventCategory =  'any' | 'art' | 'games' | 'music' | 'travel' | 'outdoor' | 'food' | 'party' | 'animals' | 'others';

export const taskCategories:EventCategory[] = [ 'any' , 'art' , 'games' , 'music' , 'travel' , 'outdoor' , 'food' , 'party' , 'animals', 'others'];

export interface ITaskBase {
    id: string;
    title: string;
    organizer: string;
    participantsNumber: number;
    description: string;
    category: EventCategory;
}


export interface BothTaskProps {
    participants: IPaticipant[];
    reviews: IReview[];
    hide: boolean;
    open: boolean;
    latLngAndAddress: ILatLngAndAddress;
    keyWords: string[];
    rate: IRate[];
}

export type ITask = ITaskBase & ITaskInputTimeString & BothTaskProps & TaskImagesWithUrlAndRefPath;

export type ITaskMoment = ITaskBase & ITaskInputTimeMoment & BothTaskProps & TaskImagesWithUrlAndRefPath;


export type DistanceRange = [number, number];
export type ParticipantsRange = [number, number];


export type TaskSearchExtraPropersType  = {
    refIndex: number
    score?: number
}

export type TaskSearchInputType= ITask & TaskSearchExtraPropersType;


export interface IFilterTasks {
    distanceRange?: DistanceRange;
    participantsRange?: ParticipantsRange;
    dateRange?: DateRangeValueType;
    category?: EventCategory;
}


export enum CurrentTaskUserTypeEnum {
    ORGNIZER =  "ORGNIZER",
    PARTICIPANT_AGREED =  "PARTICIPANT_AGREED",
    PARTICIPANT_REJECT =  "PARTICIPANT_REJECT",
    PARTICIPANT_NOT_CONFIRMED =  "PARTICIPANT_NOT_CONFIRMED",
    GUEST_LOGIN = "GUEST_LOGIN",
    GUEST_WITHOUT_LOGIN =  "GUEST_WITHOUT_LOGIN",
};


export interface TaskRefetchType <T> {
    (variables: Partial<T>): Promise<ApolloQueryResult<any>>;
}


export type ISearchTaskReturnType = {
    tasks: ITask[];
    totalLength: number;
};


export interface ITasksFilterInput {
    tasks: ITask[];
    taskFilter?: IFilterTasks;
    currentLatLng?: LatLngLiteral;
    IfFilterOutOfDateTasks?: boolean;
    ifFilterHiddenTasks?:boolean;
}

export type TaskStatusType = 'withinDate' | 'outOfDate' | 'all';


export interface IMyTaskFilterInput {
    userUid: string;
    tasks: ITask[];
    taskStatus: TaskStatusType;
    sortByDate?:boolean;
}


// (variables?: Partial<{
    //     id: string;
    // }>) => Promise<ApolloQueryResult<any>>