import {IImageObjWithUrlAndRefPath} from "./images.interface";
import {NotificationTypes} from "./notifications.interface";

export enum UserSexEnum {
    MALE = "male",
    FEMALE = "female",
}

export interface IUserBase {
    uid: string;
    displayName: string;
    email:string;
}


export interface ISignUpAdditionsInfo{
    displayName: string;
}

export type IUserInput = IUserBase & Partial<ISignUpAdditionsInfo>;


export interface IUserExtraInfo {
    sex: UserSexEnum;
    avatarImg: IImageObjWithUrlAndRefPath | null;
    friendsList: string[];
    notifications: NotificationTypes;
}

export type IUser = IUserBase & ISignUpAdditionsInfo & Partial<IUserExtraInfo>;


export interface IPersonalInfoInput {
    displayName: string;
    avatarImg: IImageObjWithUrlAndRefPath[];
    sex: UserSexEnum;
}

// export interface NotificationTypes {
//     taskUpdateNotification: TaskUpdateNotificationType[],
//     participantRequestNotification: PaticipantRequestNotificationType[],
//     friendRequestNotification: frendRequestNotificationType[]
// };
