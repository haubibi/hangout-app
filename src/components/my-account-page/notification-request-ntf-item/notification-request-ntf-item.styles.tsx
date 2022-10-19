import styled from "styled-components";
import { List, Divider } from 'antd';
import {
   notification_Item_bgColor,
    notification_request_notifications_width,
    notification_Item_height,
} from "../../../utils/notification/notifications.utils";
import { textOverFlowElilipsis } from "../../../App.styles";

export const ListItem = styled(List.Item)`
    padding: 19px 24px;
    max-width: ${notification_request_notifications_width}px;
    width: ${notification_request_notifications_width}px;
    height:${notification_Item_height}px;
    max-height: ${notification_Item_height}px;
    background-color: ${notification_Item_bgColor};
    /* background-color: #000000; */
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
      ${textOverFlowElilipsis}
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      column-gap: 20px;
      h4{
         display: flex;
         flex-direction: row;
         justify-content: flex-start;
         max-width: 100px;
      }
      .ant-list-item-meta-description{
         width:300px;
         text-align: start;
      }
   }
   .ant-avatar.ant-avatar-circle.ant-avatar-icon.sc-gsnTZi.dBRGoU {
      cursor: pointer;
   }
`

export const NotificationDivider = styled(Divider)`
   margin: 0px !important;
`;

export const NotificationTimeDiv = styled.div`
   position: absolute;
   left: 385px;
   top:70px;
   font-size: smaller;
   color: #999999;
`