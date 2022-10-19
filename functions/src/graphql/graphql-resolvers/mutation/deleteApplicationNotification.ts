import deleteApplicationNotification from "../../../utils/notifications/deleteApplicationNotification";
import { ApplicationNotificationType } from "../../../interfaces/notifications.interface";
const mutationDeleteApplicationNotification = async (
    _:any,
    {
      participantUid,
      taskId,
      organizerUid
    }:{
      participantUid: string;
      taskId: string;
      organizerUid: string;
    }
):Promise<Error | ApplicationNotificationType[]> => {
  console.log("taskId:", taskId)
  return deleteApplicationNotification({
    participantUid,
    taskId,
    organizerUid
  });
};

export default mutationDeleteApplicationNotification;
