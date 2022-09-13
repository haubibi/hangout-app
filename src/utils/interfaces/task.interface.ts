import { IUser,IReview } from './user.interface';
import { Moment } from 'moment';
import { ILatLngAndAddress } from './google.interface'
import { IImageObjWithUrlAndRefPath, IImageObjWithUrl } from '../images/images.utils'
import { UploadFile } from 'antd';

export interface IRate {
    user: IUser;
    rate: number;
}

export interface ITaskBase {
    id: string;
    title: string;
    organizer: IUser;
    participantsNumber: number;
    description: string;
}

export interface ITaskInputMoment {
    startDate:Moment | undefined;
    startTime:Moment | undefined;
    endDate:Moment | undefined;
    endTime:Moment | undefined;
    
}
export interface ITaskInputString {
    startDate:string | undefined;
    startTime:string | undefined;
    endDate:string| undefined;
    endTime:string| undefined;
}


export interface TaskImagesWithUrlAndRefPath {
    showImages: IImageObjWithUrlAndRefPath[],
    frontCoverImage: IImageObjWithUrlAndRefPath | null;
}
export interface TaskImagesWithUrl{
    showImages: IImageObjWithUrl[],
    frontCoverImage: IImageObjWithUrl | null;
}

export interface BothTaskProps {
    participants: IUser[];
    reviews: IReview[];
    hide: boolean;
    open: boolean;
    latLngAndAddress: ILatLngAndAddress;
    // showImages: IImageObjWithUrlAndRefPath[],
    // frontCoverImage: IImageObjWithUrlAndRefPath | null;
    keyWords: string[];
    rate: IRate[];
}


export interface ITask extends ITaskBase, ITaskInputString, BothTaskProps, TaskImagesWithUrlAndRefPath  {

}
export interface ITaskMoment extends ITaskBase, ITaskInputMoment, BothTaskProps, TaskImagesWithUrl {
   
}


export interface BaseTaskFormItemDetail extends ITaskInputMoment {
    title: string;
    participantsNumber: number;
    description: string;
    latLngAndAddress: ILatLngAndAddress;
    hide: boolean;
    open: boolean;
    keyWords: string[];
}

export interface ITaskFormItemDetail extends BaseTaskFormItemDetail{
    showImages: UploadFile[],
    frontCoverImage: UploadFile[];
}

export interface ITaskFormItemDetailWithImageRefAndUrl extends BaseTaskFormItemDetail{
    showImages: IImageObjWithUrlAndRefPath[],
    frontCoverImage: IImageObjWithUrlAndRefPath | null;
}