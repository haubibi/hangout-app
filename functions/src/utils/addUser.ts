import {db, Collection} from "../db";
import {IUserInput} from "../interfaces/user.interface";
import getAllUsersUid from "./getAllUsersUid";


const addUser = async (userInput:IUserInput):Promise<string | IUserInput> => {
  const {uid} = userInput;
  if (uid===null || uid==="") return uid;
  let ifUidExist = false;
  await getAllUsersUid().then((uids)=> {
    ifUidExist = uids.findIndex((id) => id ===uid) === -1?false:true;
  });

  if (ifUidExist) return uid;

  const userRef = db.ref(`${Collection.users}/${uid}`);
  await userRef.set(userInput);
  return userInput;
};

export default addUser;
