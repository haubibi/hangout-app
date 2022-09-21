import {IUser} from "../interfaces/user.interface";
import {UserSexEnum} from "../interfaces/user.interface";
const baseUser:IUser = {
  uid: "",
  displayName: "",
  email: "",
  sex: UserSexEnum.MALE,
  avatarImg: null,
  friendsList: [],
  notifications: [],
};

export default baseUser;

// uid: string;
//     displayName: string;
//     email: string;
//     sex: 'male' | 'female';
//     avatarImg: IImageObjWithUrlAndRefPath | null;
//     friendsList: IUser[];
//     notifications: NotificationTypes[];
