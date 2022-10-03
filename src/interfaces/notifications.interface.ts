import {ITask} from "./task.interface";
import {IUser} from "./user.interface";
/* eslint-disable max-len */
export enum NotificationTypeEnum {
    PARTICIPANT = "PARTICIPANT"
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


export interface IPaticipantsNotification {
    notificationType: NotificationTypeEnum.PARTICIPANT;
    type: AddTaskRequestEnum | QuitTaskRequestEnum;
    taskId: string;
    participantUid: string;
    organizerUid: string;
    read: boolean;
}

export interface ParticipantNotification{
    task: ITask;
    participant: IUser;
    organizer: IUser;
}
// eslint-disable-next-line max-len
export type NotificationTypes = IPaticipantsNotification;
