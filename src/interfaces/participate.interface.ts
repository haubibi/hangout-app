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
 * 
 * @param paticipants The participants
 * @param maxParticipantsNumber max number of participants
 * @returns if participants reach the max
 */

export const checkIfParticipantsMax = (
    paticipants: IPaticipant[],
    maxParticipantsNumber: number
): boolean =>{
    let num:number = 0;
    paticipants.forEach((paticipant)=>{
        if(paticipant.isConfirmed && paticipant.isConfirmed) {
            num ++;
        }
    });

    return num >= maxParticipantsNumber;
}