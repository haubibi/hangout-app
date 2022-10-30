import {
    FC
} from 'react';
import { Avatar } from 'antd';
import { IUser } from '../../../interfaces/user.interface';
import { UserAvatarPopover } from '../../user-avatar/user-avatar-popover/user-avatar-popover.component';
import {
    DividerCon,
    TaskAttendeeAvatarCon
} from './task-attendee-avatar.styles';

export interface ITaskAttendeeAvatarProps {
    attendees: IUser[];
}

export const TaskAttendeeAvatar: FC<ITaskAttendeeAvatarProps> = ({
    attendees
}) =>{


    return (
        <TaskAttendeeAvatarCon>
           <DividerCon orientation="left">Current Attendees</DividerCon>
           {
                attendees.length === 0? null:
                <Avatar.Group
                    maxCount={10}
                    maxPopoverTrigger="click"
                    size="large"
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}
                >
                    {
                        attendees.map((attendee, index) => <UserAvatarPopover key = {index} user = {attendee}/>)
                    }
                </Avatar.Group>
           }
        </TaskAttendeeAvatarCon>
    )
}