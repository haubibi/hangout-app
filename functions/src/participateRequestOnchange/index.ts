/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
/* eslint-disable curly */
/* eslint-disable max-len */
import * as functions from "firebase-functions";
import {AddTaskRequestEnum, IPaticipantsNotification, QuitTaskRequestEnum} from "../interfaces/notifications.interface";
import getTaskById from "../operateDatabaseFunctions/getTaskById";
import updateNotifications from "../operateDatabaseFunctions/updateNotifications";
import {IPaticipant} from "../interfaces/participate.interface";
import getUserById from "../operateDatabaseFunctions/getUserById";
import * as _ from "lodash";
import {IUser} from "../interfaces/user.interface";
import {ITask} from "../interfaces/task.interface";
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


// export interface IPaticipantsNotification {
//   type: AddTaskRequestEnum | QuitTaskRequestEnum;
//   taskId: string;
//   participantUid: string;
//   organizerUid: string;
//   read: boolean;
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

const updateNotifi = async (notificationToParticipant: IPaticipantsNotification) => {
  const participant = await getUserById(notificationToParticipant.participantUid);
  const currentNotifications = (participant as IUser).notifications;
  const notifications = Array.isArray(currentNotifications)? currentNotifications: [];
  await updateNotifications(participant as IUser, [...notifications, notificationToParticipant]);
};

const onParticipateChange = functions.database
    .ref("/tasks/{taskId}/participants")
    .onWrite(async (change, context): Promise<any>=> {
      const taskId = context.params.taskId;
      const beforeData = await change.before.val();
      const participants = await change.after.val();
      const task = await getTaskById(taskId);
      const {organizer} = task as ITask;
      let notificationToParticipant: IPaticipantsNotification;
      let notificationToOrganizer: IPaticipantsNotification;
      // 删除
      if (
        (beforeData && participants && beforeData.length > participants) ||
        (beforeData && (!participants || participants.length === 0))
      ) {
        const participant = _.differenceBy(beforeData, [...participants], filterByUid)![0];
        notificationToParticipant = {
          type: QuitTaskRequestEnum.PARTICIPANT_QUIT_REQUEST,
          taskId: taskId,
          participantUid: participant.participantUid,
          organizerUid: organizer,
          read: false,
        };
        await updateNotifi(notificationToParticipant);
      }
      console.log("beforeData:", beforeData);
      console.log("participants:", participants);

      // 更新
      if (participants) {
        const participantIndex = participants.findIndex((p:IPaticipant)=>p.newAdded);
        console.log("participant:"+ participantIndex);
        // console.log(participant);
        if (participantIndex.index === -1) return new Error("The modfified participant dosen't exist!");
        const participant = participants[participantIndex];
        switch (participant.requestType) {
          // 用户同意， 发给组织者
          case AddTaskRequestEnum.PARTICIPANT_ARGEE_REQUEST:
          // 用户拒绝， 发给组织者
          case AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST:
          // 用户拒绝， 发给组织者
          case AddTaskRequestEnum.PARTICIPANT_REFUSE_REQUEST:
            notificationToOrganizer = {
              type: participant.requestType,
              taskId: taskId,
              participantUid: participant.participantUid,
              organizerUid: organizer,
              read: false,
            };
            await updateNotifi(notificationToOrganizer);
            break;
          // 组织者同意， 发给用户
          case AddTaskRequestEnum.ORGANIZER_APPLY_REQUEST:
          // 组织者申请， 发给用户
          case AddTaskRequestEnum.ORGANIZER_ARGEE_REQUEST:
          // 组织者拒绝， 发给用户
          case AddTaskRequestEnum.ORGANIZER_REFUSE_REQUEST:
            notificationToParticipant = {
              type: participant.requestType,
              taskId: taskId,
              participantUid: participant.participantUid,
              organizerUid: organizer,
              read: false,
            };
            await updateNotifi(notificationToParticipant);
            break;
        }
      }


      // if (notificationToParticipant) {
      //   const participant = await getUserById(notificationToParticipant.participantUid);
      //   const {notifications} = participant as IUser;
      //   await updateNotifications(participant as IUser, [...notifications, notificationToParticipant]);
      // }

      // if (notificationToOrganizer) {
      //   const organizer = await getUserById(notificationToOrganizer.organizerUid);
      //   const {notifications} = organizer as IUser;
      //   await updateNotifications(organizer as IUser, [...notifications, notificationToOrganizer]);
      // }
    });

export default onParticipateChange;
