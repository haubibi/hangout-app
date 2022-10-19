import updateApplicationtNotifications from "../../../utils/notifications/updatApplicationNotifications";
import {
  ApplicationNotificationType,
} from "../../../interfaces/notifications.interface";
const mutationUpdateApplicationNotifications= async (
    _: any,
    {
        userUid,
        notifications,
    } : {
        userUid: string,
        notifications: ApplicationNotificationType[],
    }
) => {
  return updateApplicationtNotifications( userUid, notifications);
};

export default mutationUpdateApplicationNotifications;


