import { TaskUpdateNotificationType } from "../../interfaces/notifications.interface";
import { db, Collection, UserChildren, NotificationEnum } from "../../db";
import getUserById from "../getUserById";

const deleteEventUpdateNotification = ({
    participantUid,
    taskId,
    organizerUid
}:{
    participantUid: string;
    taskId:string;
    organizerUid: string;
}): Promise<Error | TaskUpdateNotificationType[]> => {
    return new Promise(async(resolve, reject) => {
        const user = await getUserById(organizerUid);
        if(!user) reject(new Error(`The organizer doesn't exist!`));
        const userEventUpdateNotificationsRef = db.ref(`${Collection.users}/${participantUid}/${UserChildren.notifications}/${NotificationEnum.taskUpdateNotification}`);
        userEventUpdateNotificationsRef
        .once("value")
        .then((snap) =>{
            // console.log("snap event update:", snap)
            return snap.val();
        })
        .then((value) => {
            // console.log("event update notification",value)
            const notifications = (value as TaskUpdateNotificationType[]).filter(
                notification => (
                    notification.participantUid !== participantUid && 
                    notification.taskId !== taskId && 
                    notification.organizerUid !== organizerUid
            ));
            // console.log("event updated notification",notifications);
            if(Array.isArray(notifications) && notifications.length === 0 ){
                userEventUpdateNotificationsRef.set(null)
                .then(()=> resolve(notifications))
                .catch(() => reject(`delete event update notifications failed!`));
            } else {
                userEventUpdateNotificationsRef.update(notifications)
                .then(()=> resolve(notifications))
                .catch(() => reject(`delete event update notifications failed!`))
            }
        })
        .catch(error => reject(error));
    });
};

export default deleteEventUpdateNotification;