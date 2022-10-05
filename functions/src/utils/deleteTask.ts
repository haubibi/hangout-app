import {db, Collection} from "../db";
import getTaskById from "./getTaskById";
import { ITask } from '../../../src/interfaces/task.interface';
import { 
  NotificationTypeEnum,
  UpdateTaskEnum,
  TaskUpdateNotificationType
 } from '../interfaces/notifications.interface';
import updateTaskUpdateNotification from "./notifications/updateTaskUpdateNotifications";
import getParticipantsUids from "./getParticipantsUids";

const deleteTask = async (
    taskId: string
):Promise<ITask | string> => {
  return new Promise(async (resolve, reject)=>{
    const taskRef = db.ref(`${Collection.tasks}/${taskId}`);
    const task = await getTaskById(taskId);
    if(!task){
      return reject(`The event doesn't exist!`);
    } else {
      await taskRef.set(null);

      //send notifications to all participants
      const participants = task.participants || [];
      const participantsUids = getParticipantsUids(participants);

      for(const participantsUid of participantsUids) {
        const taskUpdateNotification:TaskUpdateNotificationType = {
          notificationType: NotificationTypeEnum.TASK,
          type: UpdateTaskEnum.TASK_DELETE,
          taskId: task.id,
          participantUid: participantsUid,
          organizerUid: task.organizer,
          read: false,
        };
        await updateTaskUpdateNotification(participantsUid, [taskUpdateNotification])
      }


      resolve(task);
    }
  })
};

export default deleteTask;
