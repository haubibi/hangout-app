/* eslint-disable max-len */
import {AddTaskRequestEnum, QuitTaskRequestEnum} from "./notifications.interface";
export interface IPaticipant{
    participantUid: string;
    isConfirmed: boolean;
    newAdded: boolean;
    agreed: boolean;
    requestType: AddTaskRequestEnum | QuitTaskRequestEnum;
}

export enum UpdateParticipantType {
    UPDATE = "UPDATE",
    ADD = "Add"
};
