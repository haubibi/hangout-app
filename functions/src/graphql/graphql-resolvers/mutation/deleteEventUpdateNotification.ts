import { TaskUpdateNotificationType } from "../../../interfaces/notifications.interface";
import deleteEventUpdateNotification from '../../../utils/notifications/deleteEventUpdateNotification';
const mutationDeleteEventUpdateNotification = async (
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
):Promise<Error | TaskUpdateNotificationType[]> => {
  console.log("taskId:", taskId)
  return deleteEventUpdateNotification({
    participantUid,
    taskId,
    organizerUid
  });
};

export default mutationDeleteEventUpdateNotification;
