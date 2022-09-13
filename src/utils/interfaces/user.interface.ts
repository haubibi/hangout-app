import { IImageObjWithUrlAndRefPath } from "../images/images.utils";

export interface IUser {
    uid: string;
    displayName: string;
    email: string;
    sex: 'male' | 'female';
    avatarImg: IImageObjWithUrlAndRefPath | null;
    friendsList: IUser[];
}

export interface IUserInput {
    uid: string;
    displayName: string;
    email: string;
    sex: 'male' | 'female';
}


export interface IAllEmails {
    _typename: 'Email';
    email: string;
}

export interface IAdditionalInfo {
    displayName: string;
    sex: 'male' | 'female';
}

export interface IReview {
    user: IUser;
    review: string;
    time: string;
}