import addUser from "../../../operateDatabaseFunctions/addUser";
import {IUserInput} from "../../../interfaces/user.interface";
const mutationAddUser = async (
    _: any,
    {userInput}: {userInput: IUserInput},
) => {
  // console.log("userInput:" + userInput);
  return addUser(userInput);
};
export default mutationAddUser;
