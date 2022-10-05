import {ITask} from "./task.interface";
import {IUser} from "./user.interface";
/* eslint-disable max-len */
export enum NotificationTypeEnum {
    PARTICIPANT = "PARTICIPANT",
    TASK = "TASK",
    FRIEND = "FRIEND"
}

export enum AddTaskRequestEnum {
    PARTICIPANT_APPLY_REQUEST = "PARTICIPANT_APPLY_QEQUEST",
    PARTICIPANT_ARGEE_REQUEST = "PARTICIPANT_ARGEE_REQUEST",
    PARTICIPANT_REFUSE_REQUEST = "PARTICIPANT_REFUSE_REQUEST",
    ORGANIZER_APPLY_REQUEST = "ORGANIZER_APPLY_REQUEST",
    ORGANIZER_ARGEE_REQUEST = "ORGANIZER_ARGEE_REQUEST",
    ORGANIZER_REFUSE_REQUEST = "ORGANIZER_REFUSE_REQUEST",
}

export enum QuitTaskRequestEnum {
    PARTICIPANT_QUIT_REQUEST = "PARTICIPANT_QUIT_REQUEST",
    ORGNIZER_QUIT_REQUEST = "ORGNIZER_QUIT_REQUEST",
}
export enum UpdateTaskEnum {
    TASK_UPDATE = "TASK_UPDATE",
}
export enum FRIENDEnum {
    FRIEND_REQUEST = "FRIEND_REQUEST",
    FRIEND_RECEIVE= "FRIEND_RECEIVE",
}


export interface INotificationBase<T, U> {
    notificationType: T;
    type: U;
    read: boolean;
}

export interface ITaskNotification<T, U> extends INotificationBase <T, U>{
    taskId: string;
    participantUid: string;
    organizerUid: string; 
}




export type PaticipantRequestNotificationType = ITaskNotification<NotificationTypeEnum.PARTICIPANT, AddTaskRequestEnum | QuitTaskRequestEnum>;
export type TaskUpdateNotificationType = ITaskNotification<NotificationTypeEnum.TASK, UpdateTaskEnum.TASK_UPDATE>;
export type frendRequestNotificationType = INotificationBase<NotificationTypeEnum.FRIEND, FRIENDEnum> & {
    senderUid:string;
    receiverUid:string;
}

export interface NotificationTypes {
    taskUpdateNotification: TaskUpdateNotificationType[],
    participantRequestNotification: PaticipantRequestNotificationType[],
    friendRequestNotification: frendRequestNotificationType[]
};


export interface ParticipantNotification{
    task: ITask;
    participant: IUser;
    organizer: IUser;
}
export interface TaskUpdateNotification{
    task: ITask;
    organizer: IUser;
}

