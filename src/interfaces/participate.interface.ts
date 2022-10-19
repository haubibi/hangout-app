/* eslint-disable max-len */
import {AddTaskRequestEnum, QuitTaskRequestEnum} from "./notifications.interface";
export interface IPaticipant{
    participantUid: string;
    isConfirmed: boolean;
    newAdded: boolean;
    agreed: boolean;
    requestType: AddTaskRequestEnum | QuitTaskRequestEnum;
}
/**
 * get the number of current participants
 * @param paticipants  paticipants array of paticipant
 * @returns number of attended paticipants
 */

export const getNumberofParticipants = (
    paticipants: IPaticipant[] = []
):number =>{
    return paticipants.filter(paticipant => paticipant.isConfirmed && paticipant.agreed).length;
}