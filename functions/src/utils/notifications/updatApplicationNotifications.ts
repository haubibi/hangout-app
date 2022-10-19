import { db, Collection, UserChildren } from "../../db";
import { ApplicationNotificationType } from "../../interfaces/notifications.interface";
import getUserById from "../getUserById";
import getApplicationNotifications from './getApplicationNotifications';
const updateApplicationtNotifications = async (
    userUid: string,
    notifications: ApplicationNotificationType[]
):Promise<void> => {
  const user = await getUserById(userUid);
  if(!user) return;
  const userNotificationsRef = db.ref(`${Collection.users}/${userUid}/${UserChildren.notifications}`);
  const currentApplicationNotifications = await getApplicationNotifications(userUid) || [];
  await userNotificationsRef.update({
    applicationNotification: [...currentApplicationNotifications, ...notifications]
  });
};

export default updateApplicationtNotifications;
