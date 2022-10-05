/* eslint-disable no-fallthrough */

import * as functions from "firebase-functions";
import {
  AddTaskRequestEnum, 
  PaticipantRequestNotificationType, 
  QuitTaskRequestEnum, 
  NotificationTypeEnum,
} from "../interfaces/notifications.interface";
import getTaskById from "../utils/getTaskById";
import updateParticipantsNotification from "../utils/notifications/updateParticipantsNotifications";
import {IPaticipant} from "../interfaces/participate.interface";
import * as _ from "lodash";
import {ITask} from "../interfaces/task.interface";
import updateParticipant from "../utils/updateParticipant";


// export interface NotificationTypes {
//   taskUpdateNotification: TaskUpdateNotificationType[],
//   participantRequestNotification: PaticipantRequestNotificationType[],
//   friendRequestNotification: frendRequestNotificationType[]
// };


// export enum AddTaskRequestEnum {
//   PARTICIPANT_APPLY_REQUEST = "PARTICIPANT_APPLY_QEQUEST",
//   PARTICIPANT_ARGEE_REQUEST = "PARTICIPANT_ARGEE_REQUEST",
//   PARTICIPANT_REFUSE_REQUEST = "PARTICIPANT_REFUSE_REQUEST",
//   ORGANIZER_APPLY_REQUEST = "ORGANIZER_APPLY_REQUEST",
//   ORGANIZER_ARGEE_REQUEST = "ORGANIZER_ARGEE_REQUEST",
//   ORGANIZER_REFUSE_REQUEST = "ORGANIZER_REFUSE_REQUEST",
// }

// export enum QuitTaskRequestEnum {
//   PARTICIPANT_QUIT_REQUEST = "PARTICIPANT_QUIT_REQUEST",
// }

// export interface IPaticipant{
//   participantUid: string;
//   isConfirmed: boolean;
//   newAdded: boolean;
//   agreed: boolean;
//   requestType: AddTaskRequestEnum | QuitTaskRequestEnum;
// }

// // eslint-disable-next-line max-len
// export type NotificationTypes = IPaticipantsNotification;

const filterByUid = (value: IPaticipant) => value.participantUid;


const onParticipateChange = functions.database
    .ref("/tasks/{taskId}/participants")
    .onWrite(async (change, context): Promise<any>=> {
      const taskId = context.params.taskId;
      const task = await getTaskById(taskId);
      if(!task) return;
      const beforeData = await change.before.val();
      const participants = await change.after.val();
      const {organizer} = task as ITask;
      let notificationToParticipant: PaticipantRequestNotificationType;
      let notificationToOrganizer: PaticipantRequestNotificationType;
      // 删除
      if (
        (beforeData && participants && beforeData.length > participants) ||
        (beforeData && (!participants || participants.length === 0))
      ) {
        const participant = _.differenceBy(beforeData, [...participants], filterByUid)![0];
        notificationToParticipant = {
          notificationType: NotificationTypeEnum.PARTICIPANT,
          type: QuitTaskRequestEnum.PARTICIPANT_QUIT_REQUEST,
          taskId: taskId,
          participantUid: participant.participantUid,
          organizerUid: organizer,
          read: false,
        };
        await updateParticipantsNotification(participant.participantUid, [notificationToParticipant]);
      }
      // console.log("beforeData:", beforeData);
      // console.log("participants:", participants);

      // 更新
      if (participants) {
        const participantIndex = participants.findIndex((p:IPaticipant)=>p.newAdded);
        // console.log("participant:"+ participantIndex);
        if (participantIndex === -1) return new Error("The modfified participant dosen't exist!");
        const participant = participants[participantIndex];
        switch (participant.requestType) {
          // 用户同意， 发给组织者
          case AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST:
          // 用户拒绝， 发给组织者
          case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          // 用户拒绝， 发给组织者
          case AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST:
            notificationToOrganizer = {
              notificationType: NotificationTypeEnum.PARTICIPANT,
              type: participant.requestType,
              taskId: taskId,
              participantUid: participant.participantUid,
              organizerUid: organizer,
              read: false,
            };
            await updateParticipantsNotification(organizer, [notificationToOrganizer]);
            break;
          // 组织者同意， 发给用户
          case AddTaskRequestEnum.ORGANIZER_APPLY_REQUEST:
          // 组织者申请， 发给用户
          case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
          // 组织者拒绝， 发给用户
          case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
            notificationToParticipant = {
              notificationType: NotificationTypeEnum.PARTICIPANT,
              type: participant.requestType,
              taskId: taskId,
              participantUid: participant.participantUid,
              organizerUid: organizer,
              read: false,
            };
            await updateParticipantsNotification(participant.participantUid, [notificationToParticipant]);
            break;
        }
        participants[participantIndex].newAdded = false;
        console.log("participant:",participants[participantIndex])
        await updateParticipant(taskId, participants);
      }
    });

export default onParticipateChange;
