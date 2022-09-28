import {
    FC
} from 'react';
import {
    UserAvatarCon
} from './user-avatar-base.styles';
import { IImageObjWithUrlAndRefPath } from '../../../interfaces/images.interface';
import { UserOutlined } from '@ant-design/icons';

interface UserAvatarProps {
    userAvatarImg: IImageObjWithUrlAndRefPath;
}


export const UserAvatarBase:FC<UserAvatarProps> = ({
    userAvatarImg
}) => {
    return (
        <UserAvatarCon
            src =  {userAvatarImg? userAvatarImg.url: undefined}
            icon = {userAvatarImg? undefined: <UserOutlined style = {{transform:'scale(2)'}}/>}
        />
    )
}