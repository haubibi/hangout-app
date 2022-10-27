import {
    FC
} from 'react';
import {
    ClockCircleOutlined
} from '@ant-design/icons';
import { getMomentByDateAndTimeString, taskFormat, eventCountdownFormat } from '../../../utils/date/date.utils';
import {
    TimeCountdownCon,
    TaskTimeCountDownItem,
} from './task-time-countdown.styles';
import type { countdownValueType } from 'antd/es/statistic/utils';
export interface ITaskTimeCountdownProps {
    startDate: string;
    startTime: string;
}

export const TaskTimeCountdown: FC<ITaskTimeCountdownProps> = ({
    startDate,
    startTime,
}) =>{
    const startT = getMomentByDateAndTimeString(startDate, startTime).format(taskFormat);
    return (
        <TimeCountdownCon>
            <TaskTimeCountDownItem value = {startT} format = {eventCountdownFormat}/>
        </TimeCountdownCon>
    )
}