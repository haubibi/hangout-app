import {
  db, 
  Collection, 
  UserChildren
} from "../db";
import {
  IPaticipant
} from "../interfaces/participate.interface";

const updateParticipant = (
    taskId: string,
    newParticipants: IPaticipant[]
): Promise<Error | IPaticipant[]> => {

  return new Promise(async(resolve, reject)=> {
    const participantsRef = db.ref(`${Collection.tasks}/${taskId}/${UserChildren.participants}`);
    try {
      await participantsRef.set(newParticipants);
      resolve(newParticipants);
    } catch (error) {
      reject(error);
    }
  });
};

export default updateParticipant;
