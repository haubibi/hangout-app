/* eslint-disable @typescript-eslint/no-unsafe-return */
import {db, Collection} from "../db";
import {ITask} from "../../../src/interfaces/task.interface";

const getTaskById = async (id: string):Promise<ITask | null> => {
  if (!id) return null;
  return db.ref(`${Collection.tasks}/${id}`)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => {
        // console.log(value);
        if (!value) return new Error("The task doesn't exist!");
        return value;
      });
};

export default getTaskById;

