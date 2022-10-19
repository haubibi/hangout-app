/* eslint-disable @typescript-eslint/no-unsafe-return */
import {db, Collection, UserChildren, NotificationEnum} from "../../db";
import { RequestNotificationType } from "../../interfaces/notifications.interface";

const getRequestNotifications = async (
    uid: string
):Promise<RequestNotificationType[] | null> => {
  if (!uid) return null;
  return db.ref(`${Collection.users}/${uid}/${UserChildren.notifications}/${NotificationEnum.requestNotification}`)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => {
        return value;
      });
};

export default getRequestNotifications;
