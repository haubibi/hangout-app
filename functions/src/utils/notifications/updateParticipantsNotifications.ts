import { db, Collection, UserChildren } from "../../db";
import { PaticipantRequestNotificationType } from "../../interfaces/notifications.interface";
import getUserById from "../getUserById";

const updateParticipantNotifications = async (
    userUid: string,
    notifications: PaticipantRequestNotificationType[]
):Promise<void> => {
  const user = await getUserById(userUid);
  if(!user) return;
  const currentNotifications = user.notifications?.participantRequestNotification || [];
  const userNotificationsRef = db.ref(`${Collection.users}/${userUid}/${UserChildren.notifications}`);
  await userNotificationsRef.update({
    participantRequestNotification: [...currentNotifications, ...notifications]
  });
};

export default updateParticipantNotifications;
