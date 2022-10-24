import {
    FC
} from 'react';
import {
    ClockCircleOutlined
} from '@ant-design/icons';
import { getMomentByDateAndTimeString, taskFormat } from '../../../utils/date/date.utils';
import {
    TaskTimeCon,
    SpanH3,
    DivDateAndTime,
    SpanDateAndTime,
} from './task-time.styles';

export interface ITaskTimeProps {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
}

export const TaskTime: FC<ITaskTimeProps> = ({
    startDate,
    startTime,
    endDate,
    endTime
}) =>{
    const startT = getMomentByDateAndTimeString(startDate, startTime).format(taskFormat);
    const endT = getMomentByDateAndTimeString(endDate, endTime).format(taskFormat);
    return (
        <TaskTimeCon>
            <SpanH3><ClockCircleOutlined /> Date and Time</SpanH3>
            <DivDateAndTime>
                <SpanDateAndTime>{`${startT} - ${endT}`}</SpanDateAndTime>
            </DivDateAndTime>
        </TaskTimeCon>
    )
}