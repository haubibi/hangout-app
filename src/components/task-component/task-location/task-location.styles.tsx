import styled from "styled-components";
import { 
    locationConWidth,
    locationConHeight,
    locationH3LineHeight,
    locationContentLineHeight,
} from '../../../utils/default-settings/event.settings';
import { 
    normalFontFamily,
    eventTaskDateTimeFontSize,
    eventTaskDateTimeH3FontSize,
    
} from '../../../utils/default-settings/font.settings';
export const TaskLocationCon = styled.div`
    width:${locationConWidth};
    height:${locationConHeight};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

export const SpanH3 = styled.h3`
    font-family: ${normalFontFamily};
    font-size: ${eventTaskDateTimeH3FontSize}px;
    line-height: ${locationH3LineHeight}px;
    margin-bottom:0em !important;
`
export const DivLocation= styled.div`
    height: ${locationContentLineHeight}px;
    line-height: ${locationContentLineHeight}px;
    span{
        font-family: ${normalFontFamily};
        font-size: ${eventTaskDateTimeFontSize}px;
        line-height: ${locationContentLineHeight}px;
        margin-bottom:0em !important;
    }
`;
export const SpanLocation = styled.span`
    
`