import styled from "styled-components";
import { 
    eventContainerMaxWidth,
    eventContainerMinWidth,
    timeDateAttendeeConWidth,
    timeDateAttendeeConHeight,

 } from '../../../utils/default-settings/event.settings';
import { 
    strangeFontFamily,
    eventTaskTitleFontSize,
    eventTaskDescriptionFontSize
 } from "../../../utils/default-settings/font.settings";
import { 
    Row,
    Col,
} from 'antd';
import {
    carouselImgWidth,
    carouselImgHeight
} from '../../../utils/default-settings/event.settings';



export const TaskitemContainer = styled.div`
    background-color: rgba(255,255,255,0.4);
    background-attachment: fixed;
    border-radius: 50px;
    width: 100%;
    max-width: ${eventContainerMaxWidth}px;
    min-width: ${eventContainerMinWidth}px;
    padding: 100px;
    
`

export const TitleCon = styled.h2`
    font-family: ${strangeFontFamily};
    font-size: ${eventTaskTitleFontSize}px;
`
export const RowCon = styled(Row)`
    width: 100%;
`
export const CenterAlignCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CarouselCol = styled(CenterAlignCol)`
    width: 100%;
    min-width: ${carouselImgWidth};
    min-height: ${carouselImgHeight};
    flex-direction: row;
`
export const TaskDescriptionCol = styled(Col)`
    width: 100%;
`
export const TaskMapCol = styled(Col)`
    width: 100%;
`
export const TaskAttendeeAvatarCol = styled(Col)`
    width: 100%;
`
export const TaskTagsCol = styled(Col)`
    width: 100%;
`
export const TaskTimeLocationAttendeeCol = styled(Col)`
    width: 100%;
    min-width: ${timeDateAttendeeConWidth};
    min-height: ${timeDateAttendeeConHeight};
    display: flex;
    flex-direction: row;
    justify-content: center;
`


export const DescriptionCon = styled.h2`
    font-family:${strangeFontFamily};
    font-size: ${eventTaskDescriptionFontSize}px;
`
