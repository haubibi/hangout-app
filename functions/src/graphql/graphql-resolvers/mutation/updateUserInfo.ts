import { IUser } from "../../../interfaces/user.interface";
import updateUserInfo from "../../../utils/updateUserInfo";
const mutationUpdateUserInfo= async (
    _: any,
    {
        userUid,
        userInput
    }: {
        userUid: string,
        userInput: Partial<IUser>
    },
) => {
  // console.log("userInput:" + userInput);
  return updateUserInfo(userUid, userInput);
};
export default mutationUpdateUserInfo;
