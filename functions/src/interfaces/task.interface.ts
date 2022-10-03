/* eslint-disable max-len */
import {IReview} from "./review.interface";
import {IRate} from "./rate.interface";
import {ITaskInputTimeMoment, ITaskInputTimeString} from "./time.interface";
import {ILatLngAndAddress} from "./google.interface";
import {TaskImagesWithUrlAndRefPath} from "./images.interface";
import {IPaticipant} from "./participate.interface";
import { ApolloQueryResult } from "@apollo/client";

export interface ITaskBase {
    id: string;
    title: string;
    organizer: string;
    participantsNumber: number;
    description: string;
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
}


export enum CurrentTaskUserTypeEnum {
    ORGNIZER =  "ORGNIZER",
    PARTICIPANT_AGREED =  "PARTICIPANT_AGREED",
    PARTICIPANT_NOT_CONFIRMED =  "PARTICIPANT_NOT_CONFIRMED",
    GUEST_LOGIN = "GUEST_LOGIN",
    GUEST_WITHOUT_LOGIN =  "GUEST_WITHOUT_LOGIN",
};


export interface ITaskSearchInput {
    input: string;
    taskStartIndex: number;
    amout: number;
}


export interface ITaskRefetchFC {
    (variables: Partial<{id: string;}>): Promise<ApolloQueryResult<any>>;
}
export interface ITaskSearchInputRefetchFC {
    (variables: Partial<ITaskSearchInput>): Promise<ApolloQueryResult<any>>;
}


export type ISearchTaskReturnType = {
    tasks: ITask[];
    totalLength: number;
};


// (variables?: Partial<{
    //     id: string;
    // }>) => Promise<ApolloQueryResult<any>>