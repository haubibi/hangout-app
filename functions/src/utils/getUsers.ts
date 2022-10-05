/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {db, Collection} from "../db";


const getUsers= async ()=> {
  return db.ref(Collection.users)
      .once("value")
      .then((snap) =>snap.val())
      .then((value) => Object.keys(value).map((key)=>value[key]));
};

export default getUsers;

