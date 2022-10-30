/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {ParticipantNotification} from "../interfaces/notifications.interface";
import getUserById from "./getUserById";
import getTaskById from "./getTaskById";
const getParticipantNotification = async (
    participantUid: string,
    taskId: string,
    organizerUid: string
):Promise<ParticipantNotification | Error> => {
  const participant = await getUserById(participantUid);
  // console.log("participantUid:", participantUid);
  // console.log("participant:", participant);
  if (!participant) return new Error("Participant doesn't exist!");
  const organizer = await getUserById(organizerUid);
  if (!organizer) return new Error("Organize doesn't exist!");
  const task = await getTaskById(taskId);
  if (!task) return new Error("Task doesn't exist!");
  return {
    participant,
    organizer,
    task,
  };
};

export default getParticipantNotification;
