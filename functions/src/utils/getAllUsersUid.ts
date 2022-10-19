import {db, Collection} from "../db";

const getAllUsersUid = async ():Promise<string[]> => {
  return db.ref(Collection.users)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => Object.keys(value).map((key)=>value[key].uid));
};

export default getAllUsersUid;
