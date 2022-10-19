/* eslint-disable @typescript-eslint/no-unsafe-return */
import {db, Collection, UserChildren, NotificationEnum} from "../../db";
import { TaskUpdateNotificationType } from "../../interfaces/notifications.interface";

const getTaskUpdateNotifications = async (
    uid: string
):Promise<TaskUpdateNotificationType[] | null> => {
  if (!uid) return null;
  return db.ref(`${Collection.users}/${uid}/${UserChildren.notifications}/${NotificationEnum.taskUpdateNotification}`)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => {
        return value;
      });
};

export default getTaskUpdateNotifications;
