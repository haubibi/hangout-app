import { RequestNotificationType } from "../../interfaces/notifications.interface";
import { db, Collection, UserChildren, NotificationEnum } from "../../db";
import getUserById from "../getUserById";

const deleteRequestNotification = ({
    participantUid,
    taskId,
    organizerUid
}:{
    participantUid: string;
    taskId:string;
    organizerUid: string;
}): Promise<Error | RequestNotificationType[]> => {
    return new Promise(async(resolve, reject) => {
        const user = await getUserById(organizerUid);
        if(!user) reject(new Error(`The organizer doesn't exist!`));
        const userRequestNotificationsRef = db.ref(`${Collection.users}/${organizerUid}/${UserChildren.notifications}/${NotificationEnum.requestNotification}`);
        userRequestNotificationsRef
        .once("value")
        .then((snap) =>{
            return snap.val();
        })
        .then((value) => {
            // console.log("request notification",value)
            const notifications = (value as RequestNotificationType[]).filter(
                notification => (
                    notification.participantUid !== participantUid && 
                    notification.taskId !== taskId && 
                    notification.organizerUid !== organizerUid
            ));
            // console.log("updated request notification",notifications);
            if(Array.isArray(notifications) && notifications.length === 0 ){
                userRequestNotificationsRef.set(null);
            } else {
                userRequestNotificationsRef.update(notifications)
                .then(()=> resolve(notifications))
                .catch(() => reject(`delete request notifications failed!`))
            }
        })
        .catch(error => reject(error));
    });
};

export default deleteRequestNotification;