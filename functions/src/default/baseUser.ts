import {IUser} from "../interfaces/user.interface";
import {UserSexEnum} from "../interfaces/user.interface";
const baseUser:IUser = {
  uid: "",
  displayName: "",
  email: "",
  sex: UserSexEnum.MALE,
  avatarImg: null,
  friendsList: [],
  description: '',
  notifications: {
    taskUpdateNotification: [],
    applicationNotification: [],
    requestNotification: [],
    friendRequestNotification: [],
},
};



export default baseUser;
