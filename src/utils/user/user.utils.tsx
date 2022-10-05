import { IUserInput, IUser } from '../../interfaces/user.interface';
import { IImageObjWithUrlAndRefPath, IImageObjWithUrl } from '../../interfaces/images.interface';
export const createBaseUser = (userInput: IUserInput): IUser => {
    return {
        ...userInput,
        friendsList: [],
        avatarImg: null,
        notifications: {
            taskUpdateNotification: [],
            participantRequestNotification: [],
            friendRequestNotification: [],
        },
    }
}


