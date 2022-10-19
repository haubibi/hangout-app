import {db, Collection} from "../db";

const getAllUsersEmail = async ():Promise<string[]> => {
  return db.ref(Collection.users)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => Object.keys(value).map((key)=>value[key].email));
};

export default getAllUsersEmail;
