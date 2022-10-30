import * as functions from "firebase-functions";
import getParticipantsUids from "../utils/getParticipantsUids";
import { 
    TaskUpdateNotificationType,
    NotificationTypeEnum,
    UpdateTaskEnum
} from "../interfaces/notifications.interface";
import updateTaskUpdateNotifications from "../utils/notifications/updateTaskUpdateNotifications";
import * as admin from 'firebase-admin';
const moment = require('moment');

const bucketName=  `gs://hang-out-213d4.appspot.com`;
const onTaskDelete = functions.database
    .ref("/tasks/{taskId}")
    .onDelete(async (snapshot,context)=>{
        const task=  snapshot.val();
        // console.log(`ondelete: start`);
        // console.log(`task:`, task);
        

        //send notifications to all participants
        const participants = task.participants || [];
        const participantsUids = getParticipantsUids(participants);
        for(const participantsUid of participantsUids) {
            const taskUpdateNotification:TaskUpdateNotificationType = {
                time: moment().format(),
                notificationType: NotificationTypeEnum.TASK,
                type: UpdateTaskEnum.TASK_DELETE,
                taskId: task.id,
                taskTitle: task.title,
                participantUid: participantsUid,
                organizerUid: task.organizer,
                read: false,
            };
            await updateTaskUpdateNotifications(participantsUid, [taskUpdateNotification]);
        }

        // console.log(`notifications added`);

        //delete all the images from firestore
        const bucket = admin.storage().bucket(bucketName)
        await bucket.deleteFiles({directory: `images/tasks/${task.id}`})
                .then((file)=>{
                    // console.log("file", file);
                })
                .catch(error => {
                    console.error(`Error occurred while deleting the task: ${task.id}`, error)
                });
                // console.log(`images deleted`);

    });

    export default onTaskDelete;