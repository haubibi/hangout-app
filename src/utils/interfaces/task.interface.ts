import { IUser,IReview } from './user.interface';
import { Moment } from 'moment';
import { ILatLngAndAddress } from './google.interface'
import { IImageObjWithUrlAndRefPath } from '../images/images.utils'


export interface ITaskBase {
    id: string;
    title: string;
    organizer: IUser;
    participantsNumber: number;
    // location: LatLngLiteral;
    description: string;
}

export interface ITaskInputMoment extends ITaskBase{
    startDate:Moment;
    startTime:Moment;
    endDate:Moment;
    endTime:Moment;
    
}
export interface ITaskInputString extends ITaskBase{
    startDate:string | undefined;
    startTime:string | undefined;
    endDate:string| undefined;
    endTime:string| undefined;
}


export interface ITask extends ITaskInputString {
    participants: IUser[];
    reviews: IReview[];
    hide: boolean;
    open: boolean;
    // address: string;
    latLngAndAddress: ILatLngAndAddress;
    showImages: IImageObjWithUrlAndRefPath[],
    frontCoverImage: IImageObjWithUrlAndRefPath | null;
}
