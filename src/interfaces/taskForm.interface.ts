import { ITaskInputTimeMoment } from "./time.interface";
import { ILatLngAndAddress } from "./google.interface";
import { 
    TaskImagesUploadAntd,
    TaskImagesWithUrlAndRefPath
 } from './images.interface';
import { EventCategory } from './task.interface';

export interface BaseTaskFormItemDetail extends ITaskInputTimeMoment {
    title: string;
    participantsNumber: number;
    description: string;
    latLngAndAddress: ILatLngAndAddress;
    hide: boolean;
    open: boolean;
    keyWords: string[];
    category: EventCategory;
}

export type ITaskFormItemDetail = BaseTaskFormItemDetail & TaskImagesUploadAntd;

export type ITaskFormItemDetailWithImageRefAndUrl = BaseTaskFormItemDetail & TaskImagesWithUrlAndRefPath;
