import {db, Collection, UserChildren} from "../db";
import {IPaticipant} from "../interfaces/participate.interface";

const updateParticipant = async (
    taskId: string,
    newParticipants: IPaticipant[]
) => {
  // eslint-disable-next-line max-len
  const participantsRef = db.ref(`${Collection.tasks}/${taskId}/${UserChildren.participants}`);
  participantsRef.set(newParticipants);

  return newParticipants;
};

export default updateParticipant;
