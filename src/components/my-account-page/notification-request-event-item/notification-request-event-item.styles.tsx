import styled from "styled-components";
import { List } from "antd";
import { textOverFlowElilipsis } from "../../../App.styles";
import { 
   notification_request_Task_width,
   notification_request_Task_height
} from "../../../utils/notification/notifications.utils";
export const ListItem = styled(List.Item)`
   cursor: pointer;
   padding: 19px 24px;
   max-width: ${notification_request_Task_width}px;
   width: ${notification_request_Task_width}px;
   height:${notification_request_Task_height}px;
   max-height: ${notification_request_Task_height}px;
`
export const ListItemMeta = styled(List.Item.Meta)`
   width: auto;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
   & .ant-list-item-meta-avatar{
      width: 40px;
      height: 40px;
   }
   & .ant-list-item-meta-content {
      max-width: 100px;
      .h4,div{
         ${textOverFlowElilipsis}
      }
   }
`