import {
    FC
} from 'react';
import {
    PopoverCon,
    SpinCon,
} from './user-avatar-popover.styles';
import { IUser } from '../../../interfaces/user.interface';
import { UserAvatarPopoverContent } from '../user-avatar-popover-content/user-avatar-popover-content.component';
import { UserAvatarBase } from '../user-avatar-base/user-avatar-base.component';

interface UserAvatarProps {
    user: IUser;
}


export const UserAvatarPopover:FC<UserAvatarProps> = ({
    user,
}) => {
    console.log('cursor')
    if (!user) return <SpinCon />
    return (
        <PopoverCon
            trigger= "click"
            arrowPointAtCenter
            title = {user.displayName}
            content = {<UserAvatarPopoverContent partialUserProps = {user}/>}
        >
           <UserAvatarBase userAvatarImg={user.avatarImg} />
        </PopoverCon>
    )
}