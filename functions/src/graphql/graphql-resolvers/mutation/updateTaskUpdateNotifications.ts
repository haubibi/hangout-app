import updateTaskUpdateNotifications from "../../../utils/notifications/updateTaskUpdateNotifications";
import {
  TaskUpdateNotificationType,
} from "../../../interfaces/notifications.interface";
const mutationUpdateTaskUpdateNotifications = async (
    _: any,
    {
        userUid,
        notifications,
    } : {
        userUid: string,
        notifications: TaskUpdateNotificationType[],
    }
) => {
  return updateTaskUpdateNotifications( userUid, notifications);
};

export default mutationUpdateTaskUpdateNotifications;


