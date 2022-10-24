

import styled from "styled-components";
import { Divider } from 'antd';
import { 
    normalFontFamily,
    eventTaskDescriptionFontSize
} from "../../../utils/default-settings/font.settings";
export const TaskDescriptionCon = styled.div`
    padding: 30px;
`
export const TaskDescriptionItem = styled.p`
    font-family:${normalFontFamily};
    font-size: ${eventTaskDescriptionFontSize}px;
    text-align: start;
    margin-bottom: 0px !important;
    line-height: 150%;
`
export const DividerCon = styled(Divider)`
    span{
        font-size: 20px;
        font-weight: 500;
        font-style:italic;
    }
`


