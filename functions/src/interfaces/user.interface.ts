import {IImageObjWithUrlAndRefPath} from "./images.interface";
import {NotificationTypes} from "./notifications.interface";

export enum UserSexEnum {
    MALE = "male",
    FEMALE = "female",
    OTHERS = "others"
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
    description: string;
}

export type IUser = IUserBase & Partial<IUserExtraInfo>;


export interface IPersonalInfoInput {
    displayName: string;
    avatarImg: IImageObjWithUrlAndRefPath[];
    sex: UserSexEnum;
    description: string;
}

// export interface NotificationTypes {
//     taskUpdateNotification: TaskUpdateNotificationType[],
//     participantRequestNotification: PaticipantRequestNotificationType[],
//     friendRequestNotification: frendRequestNotificationType[]
// };
