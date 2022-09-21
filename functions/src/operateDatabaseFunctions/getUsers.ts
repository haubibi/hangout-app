import {db, Collection} from "../db";


const getUsers= async ()=> {
  return db.ref(Collection.users)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => Object.keys(value).map((key)=>value[key]));
};

export default getUsers;

