/* eslint-disable no-fallthrough */

import * as functions from "firebase-functions";
import {
  AddTaskRequestEnum, 
  ApplicationNotificationType, 
  RequestNotificationType, 
  QuitTaskRequestEnum, 
  NotificationTypeEnum,
} from "../interfaces/notifications.interface";
import getTaskById from "../utils/getTaskById";
import updateApplicationtNotifications from "../utils/notifications/updatApplicationNotifications";
import updateRequestNotifications from "../utils/notifications/updatRequestNotifications";
import {IPaticipant} from "../interfaces/participate.interface";
import * as _ from "lodash";
import {ITask} from "../interfaces/task.interface";
import updateParticipant from "../utils/updateParticipant";
const moment = require('moment');



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
      let notificationToParticipant: ApplicationNotificationType;
      let notificationToOrganizer: RequestNotificationType;
      // ??????
      if (
        (beforeData && participants && beforeData.length > participants) ||
        (beforeData && (!participants || participants.length === 0))
      ) {
        const participant = _.differenceBy(beforeData, [...participants], filterByUid)![0];
        notificationToOrganizer = {
          time: moment().format(),
          notificationType: NotificationTypeEnum.PARTICIPANT,
          type: QuitTaskRequestEnum.PARTICIPANT_QUIT_REQUEST,
          taskId: taskId,
          participantUid: participant.participantUid,
          organizerUid: organizer,
          read: false,
        };
        await updateRequestNotifications(participant.participantUid, [notificationToOrganizer]);
      }
      // console.log("beforeData:", beforeData);
      // console.log("participants:", participants);

      // ??????
      if (participants) {
        const participantIndex = participants.findIndex((p:IPaticipant)=>p.newAdded);
        // console.log("participant:"+ participantIndex);
        if (participantIndex === -1) return new Error("The modfified participant dosen't exist!");
        const participant = participants[participantIndex];
        switch (participant.requestType) {
          // ??????????????? ???????????????
          case AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST:
          // ??????????????? ???????????????
          case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          // ??????????????? ???????????????
          case AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST:
            notificationToOrganizer = {
              time: moment().format(),
              notificationType: NotificationTypeEnum.PARTICIPANT,
              type: participant.requestType,
              taskId: taskId,
              participantUid: participant.participantUid,
              organizerUid: organizer,
              read: false,
            };
            await updateRequestNotifications(organizer, [notificationToOrganizer]);
            break;
          // ?????????????????? ????????????
          case AddTaskRequestEnum.ORGANIZER_APPLY_REQUEST:
          // ?????????????????? ????????????
          case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
          // ?????????????????? ????????????
          case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
            notificationToParticipant = {
              time: moment().format(),
              notificationType: NotificationTypeEnum.PARTICIPANT,
              type: participant.requestType,
              taskId: taskId,
              participantUid: participant.participantUid,
              organizerUid: organizer,
              read: false,
            };
            await updateApplicationtNotifications(participant.participantUid, [notificationToParticipant]);
            break;
        }
        participants[participantIndex].newAdded = false;
        console.log("participant:",participants[participantIndex])
        await updateParticipant(taskId, participants);
      }
    });

export default onParticipateChange;
