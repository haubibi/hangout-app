import styled from "styled-components";
import { 
    notification_request_notifications_width,
    notificationListHeight,
    notificationListWidth_bgColor,
} from "../../../utils/notification/notifications.utils";
import { 
    List,
    Empty
 } from "antd";
 import InfiniteScroll from 'react-infinite-scroll-component';

export const ListCon = styled(List)`
    width: ${notification_request_notifications_width};
    height: ${notificationListHeight}px;
    background-color:${notificationListWidth_bgColor};
`

export const NoNotificationsDiv = styled.div`
    width: ${notification_request_notifications_width}px;
    height: ${notificationListHeight}px;
    line-height: ${notificationListHeight}px;
    text-align: center;
`
export const EmptyCon = styled(Empty)`
    min-height: ${notificationListHeight}px;
    height: 100%;
    width: ${notification_request_notifications_width}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    margin: 0px 0px !important;
    border: 1px solid #999999;
    
`
export const InfiniteScrollCon = styled(InfiniteScroll)`
    min-height: ${notificationListHeight}px;
    height: 100%;
`