import updateParticipantNotifications from "../../../utils/notifications/updateParticipantsNotifications";
import {
  PaticipantRequestNotificationType,
} from "../../../interfaces/notifications.interface";
const mutationUpdateParticipantNotifications= async (
    _: any,
    {
        userUid,
        notifications,
    } : {
        userUid: string,
        notifications: PaticipantRequestNotificationType[],
    }
) => {
  return updateParticipantNotifications( userUid, notifications);
};

export default mutationUpdateParticipantNotifications;


// updateParticipantNotifications(userUid: String, notifications: [ParticipantNotificationInput]): [ParticipantNotificationType]
        // updateTaskUpdateNotifications(userUid: String, notifications: [TaskUpdateNotificationInput]): [TaskUpdateNotificationType]