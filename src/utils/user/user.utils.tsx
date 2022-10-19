import { IUserInput, IUser } from '../../interfaces/user.interface';
export const createBaseUser = (userInput: IUserInput): IUser => {
    return {
        ...userInput,
        description: '',
        friendsList: [],
        avatarImg: null,
        notifications: {
            taskUpdateNotification: [],
            applicationNotification: [],
            requestNotification: [],
            friendRequestNotification: [],
        },
    }
}


