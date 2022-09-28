/* eslint-disable @typescript-eslint/no-unsafe-return */
import {db, Collection} from "../db";
import {IUser} from "../interfaces/user.interface";

const getUserById = async (uid:string):Promise<null | IUser> => {
  // console.log("uid:", uid);
  if (!uid) return null;
  return db.ref(`${Collection.users}/${uid}`)
      .once("value")
      .then((snap) =>{
        console.log(snap, "snap");
        return snap.val();
      })
      .then((value) => {
        console.log("user value:", value);
        return value;
      });
};
export default getUserById;
