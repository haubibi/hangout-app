/* eslint-disable @typescript-eslint/no-unsafe-return */
import {db, Collection, UserChildren, NotificationEnum} from "../../db";
import { ApplicationNotificationType } from "../../interfaces/notifications.interface";

const getApplicationNotifications = async (
    uid: string
):Promise<ApplicationNotificationType[] | null> => {
  if (!uid) return null;
  return db.ref(`${Collection.users}/${uid}/${UserChildren.notifications}/${NotificationEnum.applicationNotification}`)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => {
        return value;
      });
};

export default getApplicationNotifications;
