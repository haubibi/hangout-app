import styled from "styled-components";
import { 
    List,
    Empty
 } from "antd";
import { 
    notificationListHeight,
    notification_request_Task_Active_BgColor,
    notification_request_Task_InActive_BgColor,
    notification_request_Task_width,
    notification_request_Task_height,
    notification_request_Task_list_number,
    notificationListWidth_bgColor
} from "../../../utils/notification/notifications.utils";


export const NotificationList = styled(List)`
    height: ${notification_request_Task_list_number*notification_request_Task_height}px;
    width: ${notification_request_Task_width}px;
    background-color: ${notification_request_Task_InActive_BgColor};
    .active{
      background-color: ${notification_request_Task_Active_BgColor};
   }
   .inactive{
      background-color: ${notification_request_Task_InActive_BgColor};
   }
`;

export const NotificationRequestEventListCon = styled.div`
    height: ${notificationListHeight};
    overflow: auto;
    padding: 0 0px;
    border: '2px solid rgba(140, 140, 140, 0.35)';
    width: ${notification_request_Task_width}px;
`;

export const EmptyCon = styled(Empty)`
    height: ${notification_request_Task_list_number*notification_request_Task_height}px;
    width: ${notification_request_Task_width}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${notificationListWidth_bgColor};
    margin: 0px 0px !important;
    border: 1px solid #999999;
`
