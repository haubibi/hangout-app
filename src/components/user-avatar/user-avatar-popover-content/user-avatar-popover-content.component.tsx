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
            <PopoverContentItem>{`sex: ${partialUserProps.sex}`}</PopoverContentItem>
            <PopoverContentItem>{`description: ${partialUserProps.description? partialUserProps.description: `no description`}`}</PopoverContentItem>
        </PopoverContentCon>
    )
}