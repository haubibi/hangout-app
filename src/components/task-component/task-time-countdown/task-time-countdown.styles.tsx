

import styled from "styled-components";
import { 
    timeConWidth,
    timeConHeight,
    timeH3LineHeight, 
    timeContentLineHeight
} from '../../../utils/default-settings/event.settings';
import { 
    normalFontFamily,
    eventTaskDateTimeFontSize,
    eventTaskDateTimeH3FontSize,
} from '../../../utils/default-settings/font.settings';
import { Statistic } from 'antd';
const { Countdown } = Statistic;

export const TaskTimeCon = styled.div`
    width:${timeConWidth}px;
    height:${timeConHeight}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

export const SpanH3 = styled.h3`
    font-family: ${normalFontFamily};
    font-size: ${eventTaskDateTimeH3FontSize}px;
    line-height: ${timeH3LineHeight}px;
    margin-bottom:0em !important;
`
export const TimeCountdownCon = styled.div`
    height: ${timeContentLineHeight * 2}px;
    line-height: ${timeH3LineHeight}px;
    span{
        font-family: ${normalFontFamily};
        font-size: ${eventTaskDateTimeFontSize}px;
        line-height: ${timeContentLineHeight}px;
        margin-bottom:0em !important;
    }
`;
export const TaskTimeCountDownItem = styled(Countdown)`
    
`

