import {
    FC
} from 'react';
import { ILatLngAndAddress } from '../../../interfaces/google.interface';
import {
    EnvironmentOutlined
} from '@ant-design/icons';
import {
    TaskLocationCon,
    SpanH3,
    DivLocation,
    SpanLocation,
} from './task-location.styles';

export interface ITaskLocationProps {
    location: ILatLngAndAddress['address'];
}

export const TaskLocation: FC<ITaskLocationProps> = ({
    location
}) =>{
    return (
        <TaskLocationCon>
            <SpanH3><EnvironmentOutlined /> Location</SpanH3>
            <DivLocation>
                <SpanLocation>{`${location}`}</SpanLocation>
            </DivLocation>
        </TaskLocationCon>
    )
}