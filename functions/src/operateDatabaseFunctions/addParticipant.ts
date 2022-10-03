import getTaskById from "./getTaskById";
import updateParticipant from "./updateParticipant";
import {AddTaskRequestEnum} from "../interfaces/notifications.interface";
import {IPaticipant} from "../interfaces/participate.interface";
import getUserById from "./getUserById";
/**
 * 
 * @param paticipants The participant array
 * @param paticipantApplyUid Uid of the applyied paticipant
 * @returns false or the existed participant
 */

const checkIfApplyExist = (paticipants: IPaticipant[], paticipantApplyUid: string):false | IPaticipant => {
  const index = paticipants.findIndex((paticipant)=> {
    return (paticipantApplyUid === paticipant.participantUid &&
            !paticipant.isConfirmed);
  });
  
  return index === -1? false: paticipants[index];
};

/**
 * 
 * @param paticipants  The participant array
 * @param maxNumberOfPaticipants  max number of participants
 * @returns boolean If reaches the maximum 
 */

const checkIfMax = (paticipants: IPaticipant[], maxNumberOfPaticipants: number):boolean =>{
  let num = 0;
  paticipants.forEach((paticipant)=>{
    if (paticipant.agreed && paticipant.isConfirmed) num++;
  });
  return num>=maxNumberOfPaticipants;
};

const addParticipant = async (
  participantUid: string, 
  taskId: string, 
  addTaskRequestType: AddTaskRequestEnum
  ):Promise<Error | IPaticipant> => {
  // eslint-disable-next-line no-async-promise-executor

  return new Promise( async (resolve, reject)=>{
    console.log("addTaskRequestType:" + addTaskRequestType);
    // check if task exist
    const task = await getTaskById(taskId);
    console.log("task:", task)
    console.log("taskId:", taskId)
    if (!task) return reject(new Error("The task doesn't exist"));
    // check if already applied
    const taskParticipants = task.participants;
    const {participantsNumber} = task;
    const participants = (Array.isArray(taskParticipants) && taskParticipants.length > 0)? taskParticipants: [];
    // check if max
    const ifMax = checkIfMax(participants, participantsNumber);
    if (ifMax) return reject(new Error("The participants has reached the maximum!"));
    const currentParticipant = checkIfApplyExist(participants, participantUid);

    const participantUser = await getUserById(participantUid);
    if(!participantUser)  return reject(new Error("The participant info is wrong, please try again!"));
    const organizerUser = await getUserById(task.organizer);
    if(!organizerUser)  return reject(new Error("The orgnizer info is wrong, please try again!"));
    
    const participantDisplayName = participantUser.displayName;
    const organizerDisplayName = organizerUser.displayName;


    // if the participant apply exist, check all the types
    if (currentParticipant) {
      // let message: string;
      currentParticipant.requestType = addTaskRequestType;
      currentParticipant.newAdded = true;
      switch (addTaskRequestType) {
        // 用户发出请求， 不能重复发出，直接返回
        case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          return reject(new Error(`You have submitted the apply, wait for the organizer ${organizerDisplayName} confirm!`));
          // 用户同意请求，加入该活动
        case AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST:
          currentParticipant.agreed = true;
          currentParticipant.isConfirmed = true;
          // message = `You have successfully attented the event!`;
          break;
          // 用户拒绝请求
        case AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST:
          currentParticipant.agreed = false;
          currentParticipant.isConfirmed = true;
          // message = `You have rejected the event invitation!`;
          break;
          // 组织者重复发出请求，直接返回
        case AddTaskRequestEnum.ORGANIZER_APPLY_REQUEST:
          return reject(new Error(`You have sent the invitation, please wait for the participant ${participantDisplayName} confirm!`));
          // 组织者同意请求，加入该活动
        case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
          currentParticipant.agreed = true;
          currentParticipant.isConfirmed = true;
          // message = `You have agreed the event application!`;
          break;
          // 组织者拒绝请求
        case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
          currentParticipant.agreed = false;
          currentParticipant.isConfirmed = true;
          // message = `You have rejected the event application!`;
          break;
      }

      await updateParticipant(taskId, participants).then(()=>{
        return resolve(currentParticipant);
      }).catch((error)=>{
        return reject(error);
      });
    } else {
      const participant:string = participantUid;
      const newAdded = true;
      const requestType:AddTaskRequestEnum = addTaskRequestType;
      let isConfirmed = false;
      let agreed = false;
      // let message: string;
      switch (addTaskRequestType) {
        // 用户发出请求
        case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          isConfirmed = false;
          agreed = false;
          // message = `You have sent the application, please wait for the organizer ${organizerDisplayName} confirm!`;
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
          // message = `You have sent the application, please wait for the paticipaint ${participantDisplayName} confirm!`;
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

      await updateParticipant(taskId, newParticipants).then(()=>{
        return resolve(participantData);
      }).catch((error)=>{
        return reject(error);
      });
    }
  });
};

export default addParticipant;
