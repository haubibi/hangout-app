import { db, Collection, UserChildren } from "../../db";
import { TaskUpdateNotificationType } from "../../interfaces/notifications.interface";
import getUserById from "../getUserById";
import getTaskUpdateNotifications from "./getTaskUpdateNotifications";

const updateTaskUpdateNotifications = async (
    userUid: string,
    notifications: TaskUpdateNotificationType[]
):Promise<void> => {
  const user = await getUserById(userUid);
  if(!user) return;
  const userNotificationsRef = db.ref(`${Collection.users}/${userUid}/${UserChildren.notifications}`);
  const currentUpdateNotifications = await getTaskUpdateNotifications(userUid) || [];
  await userNotificationsRef.update({
    taskUpdateNotification: [...currentUpdateNotifications, ...notifications]
  });
};

export default updateTaskUpdateNotifications;
