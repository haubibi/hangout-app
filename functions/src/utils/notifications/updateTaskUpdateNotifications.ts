import { db, Collection, UserChildren } from "../../db";
import { TaskUpdateNotificationType } from "../../interfaces/notifications.interface";
import getUserById from "../getUserById";

const updateTaskUpdateNotifications = async (
    userUid: string,
    notifications: TaskUpdateNotificationType[]
):Promise<void> => {
  const user = await getUserById(userUid);
  if(!user) return;
  const currentNotifications = user.notifications?.taskUpdateNotification || [];
  const userNotificationsRef = db.ref(`${Collection.users}/${userUid}/${UserChildren.notifications}`);
  await userNotificationsRef.update({
    taskUpdateNotification: [...currentNotifications, ...notifications]
  });
};

export default updateTaskUpdateNotifications;
