

import styled from "styled-components";
import { 
    attendeeConWidth, 
    attendeeConHeight, 
    attendeeH3LineHeight,
    attendeeContentLineHeight
} from '../../../utils/default-settings/event.settings';
import { 
    normalFontFamily,
    eventTaskDateTimeFontSize,
    eventTaskDateTimeH3FontSize,
    
} from '../../../utils/default-settings/font.settings';
export const TaskAttendeeCon = styled.div`
    width:${attendeeConWidth}px;
    height:${attendeeConHeight}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

export const SpanH3 = styled.h3`
    font-family: ${normalFontFamily};
    font-size: ${eventTaskDateTimeH3FontSize}px;
    line-height: ${attendeeH3LineHeight}px;
    margin-bottom:0em !important;
`
export const DivAttendee = styled.div`
    height: ${attendeeH3LineHeight * 2}px;
    line-height: ${attendeeH3LineHeight}px;
    span{
        font-family: ${normalFontFamily};
        font-size: ${eventTaskDateTimeFontSize}px;
        line-height: ${attendeeContentLineHeight}px;
        margin-bottom:0em !important;
    }
`;
export const SpanAttendee = styled.span`
    
`
export const SpanNumber = styled.span`
    font-weight: 700;
`

