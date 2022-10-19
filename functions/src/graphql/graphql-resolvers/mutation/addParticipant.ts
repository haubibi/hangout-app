import addParticipant from "../../../utils/addParticipant";
import {
  AddTaskRequestEnum,
} from "../../../interfaces/notifications.interface";
import { IPaticipant } from "../../../interfaces/participate.interface";
const mutationAddParticipant= async (
    _: any,
    {
      participantUid,
      taskId,
      addTaskRequestType,
    } : {
      participantUid: string,
      taskId: string,
      addTaskRequestType: AddTaskRequestEnum
    }
):Promise<Error | IPaticipant>  => {
  return addParticipant( participantUid, taskId, addTaskRequestType );
};

export default mutationAddParticipant;
