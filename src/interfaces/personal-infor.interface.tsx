import { IImageObjWithUrlAndRefPath } from './images.interface';
import { UserSexEnum } from './user.interface';
export interface IPersonalInfoInput {
    displayName: string;
    avatarImg: IImageObjWithUrlAndRefPath[];
    sex: UserSexEnum;
}