/* eslint-disable max-len */
import {ITaskInputTimeMoment} from "./time.interface";
import {ILatLngAndAddress} from "./google.interface";
// eslint-disable-next-line linebreak-style
import {TaskImagesUploadAntd, TaskImagesWithUrlAndRefPath} from "./images.interface";

export interface BaseTaskFormItemDetail extends ITaskInputTimeMoment {
    title: string;
    participantsNumber: number;
    description: string;
    latLngAndAddress: ILatLngAndAddress;
    hide: boolean;
    open: boolean;
    keyWords: string[];
}

export type ITaskFormItemDetail = BaseTaskFormItemDetail & TaskImagesUploadAntd;

export type ITaskFormItemDetailWithImageRefAndUrl = BaseTaskFormItemDetail & TaskImagesWithUrlAndRefPath;
