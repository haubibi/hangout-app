import updateRequestNotifications from "../../../utils/notifications/updatRequestNotifications";
import {
    RequestNotificationType,
} from "../../../interfaces/notifications.interface";
const mutationUpdateRequestNotifications= async (
    _: any,
    {
        userUid,
        notifications,
    } : {
        userUid: string,
        notifications: RequestNotificationType[],
    }
) => {
  return updateRequestNotifications( userUid, notifications);
};

export default mutationUpdateRequestNotifications;


