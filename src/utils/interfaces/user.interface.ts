export interface IUser {
    uid: string;
    displayName: string;
    email: string;
    // avatarStr: string;
}


export interface IAllEmails {
    _typename: 'Email';
    email: string;
}

export interface IAdditionalInfo {
    displayName: string;
}

export interface IReview {
    user: IUser;
    review: string;
}