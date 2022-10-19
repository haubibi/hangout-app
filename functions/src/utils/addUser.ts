import {db, Collection} from "../db";
import {IUserInput} from "../interfaces/user.interface";
import getAllUsersUid from "./getAllUsersUid";
import getAllUsersEmail from "./getAllUsersEmail";


const addUser = async (userInput:IUserInput):Promise<string | IUserInput> => {
  const {uid, email} = userInput;
  if (uid===null || uid==="") return uid;
  let ifUidExist:boolean = false;
  let ifEmailExist:boolean = false;
  await getAllUsersUid().then((uids)=> {
    ifUidExist = uids.findIndex((id) => id ===uid) === -1?false:true;
  });
  await getAllUsersEmail().then((emails)=> {
    ifEmailExist = emails.findIndex((cemail) => email === cemail) === -1?false:true;
  });

  if (ifUidExist || ifEmailExist) return uid;

  const userRef = db.ref(`${Collection.users}/${uid}`);
  await userRef.set(userInput);
  return userInput;
};

export default addUser;
