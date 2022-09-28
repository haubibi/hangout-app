import { FC } from 'react';
import {
    PopoverContentCon,
    PopoverContentItem
} from './user-avatar-popover-content.styles';
import { IUser } from '../../../interfaces/user.interface';

interface IUserAvatarPopoverContentProps {
    partialUserProps: Partial<IUser>
}

export const UserAvatarPopoverContent:FC<IUserAvatarPopoverContentProps> = ({
    partialUserProps
}) => {
    return(
        <PopoverContentCon>
            <PopoverContentItem>{`Sex: ${partialUserProps.sex}`}</PopoverContentItem>
        </PopoverContentCon>
    )
}