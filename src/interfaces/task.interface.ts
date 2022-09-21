/* eslint-disable max-len */
import {IReview} from "./review.interface";
import {IRate} from "./rate.interface";
import {ITaskInputTimeMoment, ITaskInputTimeString} from "./time.interface";
import {ILatLngAndAddress} from "./google.interface";
import {TaskImagesWithUrlAndRefPath} from "./images.interface";
import {IPaticipant} from "./participate.interface";

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

export interface IFilterTasks {
    distanceRange?: DistanceRange;
    participantsRange?: ParticipantsRange;
}
