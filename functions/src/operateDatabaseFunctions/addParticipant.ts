/* eslint-disable max-len */
import getTaskById from "./getTaskById";
import updateParticipant from "./updateParticipant";
import {AddTaskRequestEnum} from "../interfaces/notifications.interface";
import {IPaticipant} from "../interfaces/participate.interface";


const checkIfApplyExist = (paticipants: IPaticipant[], paticipantApplyUid: string):false | IPaticipant => {
  let par:(false | IPaticipant) = false;
  console.log(paticipants);
  paticipants.forEach((paticipant) => {
    if (paticipantApplyUid === paticipant.participantUid) {
      par = paticipant;
    }
  });
  return par;
};

const checkIfMax = (paticipants: IPaticipant[], maxNumberOfPaticipants: number):boolean =>{
  let num = 0;
  paticipants.forEach((paticipant)=>{
    if (paticipant.agreed) num++;
  });
  return num>=maxNumberOfPaticipants;
};

const addParticipant = async (participantUid: string, taskId: string, addTaskRequestType: AddTaskRequestEnum):Promise<Error | IPaticipant[]> => {
  // eslint-disable-next-line no-async-promise-executor

  // eslint-disable-next-line no-async-promise-executor, @typescript-eslint/no-misused-promises
  return new Promise( async (resolve, reject)=>{
    console.log("addTaskRequestType:" + addTaskRequestType);
    // check if task exist
    const task = await getTaskById(taskId);
    if (!task) return reject(new Error("the task doesn't exists"));
    // check if already applied
    const taskParticipants = task.participants;
    const {participantsNumber} = task;
    const participants = (Array.isArray(taskParticipants) && taskParticipants.length > 0)? taskParticipants: [];
    // check if max
    const ifMax = checkIfMax(participants, participantsNumber);
    if (ifMax) return reject(new Error("It has reached the maximum!"));
    const currentParticipant = checkIfApplyExist(participants, participantUid);

    // check all the types
    if (currentParticipant) {
      currentParticipant.requestType = addTaskRequestType;
      currentParticipant.newAdded = true;
      switch (addTaskRequestType) {
        // 用户发出请求， 不能重复发出，直接返回
        case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          return reject(new Error("You have submit the apply, wait for the organizer confirm!"));
          // 用户同意请求，加入该活动
        case AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST:
          currentParticipant.agreed = true;
          currentParticipant.isConfirmed = true;
          break;
          // 用户拒绝请求
        case AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST:
          currentParticipant.agreed = false;
          currentParticipant.isConfirmed = true;
          break;
          // 组织者重复发出请求，直接返回
        case AddTaskRequestEnum.ORGANIZER_APPLY_REQUEST:
          return reject(new Error("You have set the invitation, please wait for user confirm!"));
          // 组织者同意请求，加入该活动
        case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
          currentParticipant.agreed = true;
          currentParticipant.isConfirmed = true;
          break;
          // 组织者拒绝请求
        case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
          currentParticipant.agreed = false;
          currentParticipant.isConfirmed = true;
          break;
      }

      await updateParticipant(taskId, participants).then((newPaticipants)=>{
        return resolve(newPaticipants);
      }).catch((error)=>{
        return reject(error);
      });
    } else {
      const participant:string = participantUid;
      const newAdded = true;
      const requestType:AddTaskRequestEnum = addTaskRequestType;
      let isConfirmed = false;
      let agreed = false;
      switch (addTaskRequestType) {
        // 用户发出请求
        case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          isConfirmed = false;
          agreed = false;
          break;
          // 用户同意请求 在没有的情况下不可能发生
        case AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST:
          return reject(new Error("This situation doesn't exist!" + AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST));
          // 用户拒绝请求 在没有的情况下不可能发生
        case AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST:
          return reject(new Error("This situation doesn't exist!" + AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST));
          // 组织者发出邀请 等待用户同意
        case AddTaskRequestEnum.ORGANIZER_APPLY_REQUEST:
          agreed = false;
          isConfirmed = false;
          break;
          // 组织者同意请求，在没有的情况下不可能发生
        case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
          return reject(new Error("This situation doesn't exist!" + AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST));
          // 组织者拒绝请求，在没有的情况下不可能发生
        case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
          return reject(new Error("This situation doesn't exist!" + AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST));
      }
      const participantData:IPaticipant = {participantUid: participant, newAdded, requestType, agreed, isConfirmed};
      const newParticipants = [
        ...participants,
        participantData,
      ];

      await updateParticipant(taskId, newParticipants).then((newPaticipants)=>{
        return resolve(newPaticipants);
      }).catch((error)=>{
        return reject(error);
      });
    }
  });
};

export default addParticipant;
