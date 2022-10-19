import { db, Collection, UserChildren } from "../../db";
import { RequestNotificationType } from "../../interfaces/notifications.interface";
import getUserById from "../getUserById";
import getRequestNotifications from './getRequestNotifications';

const updateRequestNotifications = async (
    userUid: string,
    notifications: RequestNotificationType[]
):Promise<void> => {
  const user = await getUserById(userUid);
  if(!user) return;
  const userNotificationsRef = db.ref(`${Collection.users}/${userUid}/${UserChildren.notifications}`);
  const currentRequestNotifications = await getRequestNotifications(userUid) || [];
  await userNotificationsRef.update({
    requestNotification: [...currentRequestNotifications, ...notifications]
  });
};

export default updateRequestNotifications;
