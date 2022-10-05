import styled from "styled-components";
import { 
    strangeFontFamily,
    eventTaskTitleFontSize,
    eventTaskDescriptionFontSize
 } from "../../utils/default-settings/font.settings";
import { 
    Row,
    Col
 } from 'antd';


export const TaskitemContainer = styled.div`
    background-color: aquamarine;
    width: 100%;
    padding: 5%;
    min-width: 500px;
`

export const TitleCon = styled.h2`
    font-family: ${strangeFontFamily};
    font-size: ${eventTaskTitleFontSize}px;
`
export const RowCon = styled(Row)`
`
export const BaseCol = styled(Col)`
   
`

export const CenterAlignCol = styled(BaseCol)`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DescriptionCon = styled.h2`
    font-family:${strangeFontFamily};
    font-size: ${eventTaskDescriptionFontSize}px;
`
