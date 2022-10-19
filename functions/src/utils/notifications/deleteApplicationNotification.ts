import { ApplicationNotificationType } from "../../interfaces/notifications.interface";
import { db, Collection, UserChildren, NotificationEnum } from "../../db";
import getUserById from "../getUserById";

const deleteApplicationNotification = ({
    participantUid,
    taskId,
    organizerUid
}:{
    participantUid: string;
    taskId:string;
    organizerUid: string;
}): Promise<Error | ApplicationNotificationType[]> => {
    return new Promise(async(resolve, reject) => {
        const user = await getUserById(organizerUid);
        if(!user) reject(new Error(`The organizer doesn't exist!`));
        const userApplicationNotificationsRef = db.ref(`${Collection.users}/${participantUid}/${UserChildren.notifications}/${NotificationEnum.applicationNotification}`);
        userApplicationNotificationsRef
        .once("value")
        .then((snap) =>{
            return snap.val();
        })
        .then((value) => {
            console.log("application notification",value)
            const notifications = (value as ApplicationNotificationType[]).filter(
                notification => (
                    notification.participantUid !== participantUid && 
                    notification.taskId !== taskId && 
                    notification.organizerUid !== organizerUid
            ));
            console.log("updated application notification",notifications);
            if(Array.isArray(notifications) && notifications.length === 0 ){
                userApplicationNotificationsRef.set(null)
                .then(()=> resolve(notifications))
                .catch(() => reject(`delete event update notifications failed!`));;
            } else {
                userApplicationNotificationsRef.update(notifications)
                .then(()=> resolve(notifications))
                .catch(() => reject(`delete application notifications failed!`))
            }
        })
        .catch(error => reject(error));
    });
};

export default deleteApplicationNotification;