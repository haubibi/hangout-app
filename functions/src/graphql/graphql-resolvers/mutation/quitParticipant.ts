import quitParticipant from "../../../operateDatabaseFunctions/quitParticipant";
import {
  QuitTaskRequestEnum,
} from "../../../interfaces/notifications.interface";
const mutationQuitParticipant = async (
    _: any,
    {
      participantUid,
      taskId,
      quitTaskRequestType,
    } : {
      participantUid: string,
      taskId: string,
      quitTaskRequestType: QuitTaskRequestEnum
    }
) => {
  return quitParticipant( participantUid, taskId, quitTaskRequestType);
};

export default mutationQuitParticipant;
