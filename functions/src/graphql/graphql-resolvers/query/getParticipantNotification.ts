/* eslint-disable max-len */

import {ParticipantNotification} from "../../../interfaces/notifications.interface";
import getParticipantNotification from "../../../operateDatabaseFunctions/getParticipantNotification";
const queryGetParticipantNotification = async (
    _:any,
    {
      participantUid,
      taskId,
      organizerUid,
    }: {participantUid: string, taskId: string, organizerUid: string}
): Promise<ParticipantNotification | Error>=>{
  return getParticipantNotification(participantUid, taskId, organizerUid);
};


export default queryGetParticipantNotification;
