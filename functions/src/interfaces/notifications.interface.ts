/* eslint-disable max-len */
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
}


export interface IPaticipantsNotification {
    type: AddTaskRequestEnum | QuitTaskRequestEnum;
    taskId: string;
    participantUid: string;
    organizerUid: string;
    read: boolean;
}


// eslint-disable-next-line max-len
export type NotificationTypes = IPaticipantsNotification;
