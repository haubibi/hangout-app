import { IUserInput, IUser } from '../../interfaces/user.interface';
export const createBaseUser = (userInput: IUserInput): IUser => {
    return {
        ...userInput,
        friendsList: [],
        avatarImg: null,
        notifications: []
    }
}

