

import styled from "styled-components";
import { 
    attendeeH3LineHeight,
    attendeeContentLineHeight
} from '../../../utils/default-settings/event.settings';
import { Divider } from "antd";

export const TaskAttendeeAvatarCon = styled.div`
    width:100%;
    height:auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 30px;
    .ant-avatar-group{
        .ant-avatar{
            cursor: pointer;
        }
    }
`
export const DividerCon = styled(Divider)`
    span{
        font-size: 20px;
        font-weight: 500;
        font-style:italic;
    }
`