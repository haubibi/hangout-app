import {db, Collection} from "../db";
import baseTask from "../default/baseTask";
import {ITask} from "../interfaces/task.interface";
import updateTaskUpdateNotification from "./notifications/updateTaskUpdateNotifications";
import { 
  NotificationTypeEnum,
  UpdateTaskEnum,
  TaskUpdateNotificationType
 } from '../interfaces/notifications.interface';
 import getParticipantsUids from "./getParticipantsUids";

const addTask = async (
  taskObj:ITask,
  isNewTaskForm: boolean
):Promise<ITask> => {
  // console.log("task:",taskObj,"111111111111111111")
  const task = {
    ...baseTask,
    ...taskObj,
  };
  const taskRef = db.ref(`${Collection.tasks}/${taskObj.id}`);
  // const taskRef = tasksRef.child(taskObj.id);
  await taskRef.set(task).then(async()=>{
    if(isNewTaskForm) {
      const participants = task.participants || [];
      const participantsUids = getParticipantsUids(participants);

      for(const participantsUid of participantsUids) {
        const taskUpdateNotification:TaskUpdateNotificationType = {
          notificationType: NotificationTypeEnum.TASK,
          type: UpdateTaskEnum.TASK_UPDATE,
          taskId: taskObj.id,
          participantUid: participantsUid,
          organizerUid: taskObj.organizer,
          read: false,
        };
        await updateTaskUpdateNotification(participantsUid, [taskUpdateNotification])
      }
    }
  });
  return task;
};

export default addTask;
