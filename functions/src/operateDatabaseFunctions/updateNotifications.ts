import {db, Collection, UserChildren} from "../db";
import {IUser} from "../interfaces/user.interface";
import {NotificationTypes} from "../interfaces/notifications.interface";

const updateNotifications = async (
    userInput: IUser,
    notifications: NotificationTypes[]
) => {
  const {uid} = userInput;
  // eslint-disable-next-line max-len
  const userNotificationsRef = db.ref(`${Collection.users}/${uid}/${UserChildren.notifications}`);
  await userNotificationsRef.set(notifications);

  return notifications;
};

export default updateNotifications;
