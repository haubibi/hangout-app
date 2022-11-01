import {
    FC
} from 'react';
import { ILatLngAndAddress } from '../../../interfaces/google.interface';
import {
    EnvironmentOutlined
} from '@ant-design/icons';
import { Popover } from 'antd';
import {
    TaskLocationCon,
    SpanH3,
    DivLocation,
    SpanLocation,
    PopoverContentDiv,
} from './task-location.styles';

export interface ITaskLocationProps {
    location: ILatLngAndAddress['address'];
}

export const TaskLocation: FC<ITaskLocationProps> = ({
    location
}) =>{
    const LocationContent = (
        <PopoverContentDiv>
          <p>{location}</p>
        </PopoverContentDiv>
    );
    return (
        <TaskLocationCon>
            <Popover  content={ LocationContent }  placement="top" trigger = {['click', 'hover']} >
                <SpanH3><EnvironmentOutlined /> Location</SpanH3>
            </Popover>
            <DivLocation>
                <SpanLocation>{`${location}`}</SpanLocation>
            </DivLocation>
        </TaskLocationCon>
    )
}