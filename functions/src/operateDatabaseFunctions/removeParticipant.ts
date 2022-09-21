/* eslint-disable space-before-blocks */
/* eslint-disable max-len */
import getTaskById from "./getTaskById";
import updateParticipant from "./updateParticipant";
import {QuitTaskRequestEnum} from "../interfaces/notifications.interface";
import {IPaticipant} from "../interfaces/participate.interface";
// export enum QuitTaskRequestEnum {
//   PARTICIPANT_QUIT_REQUEST = "PARTICIPANT_QUIT_REQUEST",
// }


// export interface IPaticipantsNotification {
//   type: AddTaskRequestEnum | QuitTaskRequestEnum;
//   taskId: string;
//   participantUid: string;
//   organizerUid: string;
//   read: boolean;
// }
// export interface IPaticipant{
//     participantUid: string;
//     isConfirmed: boolean;
//     newAdded: boolean;
//     agreed: boolean;
//     requestType: AddTaskRequestEnum | QuitTaskRequestEnum;
// }


const removeParticipant = async (participantUid: string, taskId: string, removeTaskRequestType: QuitTaskRequestEnum):Promise<Error | IPaticipant[]> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise( async (resolve, reject)=>{
    // check if task exist
    const task = await getTaskById(taskId);
    if (!task) return reject(new Error("The task doesn't exists"));
    const {participants} = task;
    const index = participants.findIndex((participant)=>participant.participantUid === participantUid);
    // 如果用户不存在
    if (index === -1) return reject(new Error("The user doesn't exist!"));

    // 用户存在
    // 删除该用户
    if (removeTaskRequestType === QuitTaskRequestEnum.PARTICIPANT_QUIT_REQUEST){
      participants.filter((participant)=>participant.participantUid !== participantUid);
    }

    await updateParticipant(taskId, participants).then((newPaticipants)=>{
      return resolve(newPaticipants);
    }).catch((error)=>{
      return reject(error);
    });
  });
};


export default removeParticipant;
