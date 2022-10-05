import getTaskById from "./getTaskById";
import updateParticipant from "./updateParticipant";
import {QuitTaskRequestEnum} from "../interfaces/notifications.interface";
import {IPaticipant} from "../interfaces/participate.interface";
/**
 * 
 * @param paticipants The participant array
 * @param paticipantUid Uid of the quit paticipant
 * @returns false or the existed participant
 */

const checkIfParticipantExist = (paticipants: IPaticipant[], paticipantUid: string):false | IPaticipant => {
    const index = paticipants.findIndex((paticipant)=> {
    return (paticipantUid === paticipant.participantUid &&
            paticipant.isConfirmed &&
            paticipant.agreed
            );
    });

    return index === -1? false: paticipants[index];
};


const quitParticipant = async (
    participantUid: string, 
    taskId: string, 
    quitTaskRequestType: QuitTaskRequestEnum
):Promise<Error | IPaticipant> => {
    return new Promise( async (resolve, reject)=>{
        console.log("quitTaskRequestType:" + quitTaskRequestType);
        // check if task exist
        const task = await getTaskById(taskId);
        console.log("task:", task)
        console.log("taskId:", taskId)
        if (!task) return reject(new Error("The task doesn't exist"));
        // check if already applied
        const taskParticipants = task.participants;
        const participants = (Array.isArray(taskParticipants) && taskParticipants.length > 0)? taskParticipants: [];


        const currentParticipant = checkIfParticipantExist(participants, participantUid);
        if(!currentParticipant) return reject(new Error("You are not on the event list!"));


        let newParticipants: IPaticipant[] = participants;
        // let message: string = '';
        if(quitTaskRequestType === QuitTaskRequestEnum.PARTICIPANT_QUIT_REQUEST){
            newParticipants = participants.filter(participant => participant.participantUid !== participantUid);
            // message = `You have quit the Event successfully!`;
        }


        await updateParticipant(taskId, newParticipants).then(()=>{
                return resolve(currentParticipant);
            }).catch((error)=>{
                return reject(error);
            });
    });

};

export default quitParticipant;
