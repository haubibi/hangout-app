import addParticipant from "../../../utils/addParticipant";
import {
  AddTaskRequestEnum,
} from "../../../interfaces/notifications.interface";
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
) => {
  return addParticipant( participantUid, taskId, addTaskRequestType );
};

export default mutationAddParticipant;
