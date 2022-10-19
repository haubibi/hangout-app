import styled from "styled-components";
import { List, Button } from "antd";
import { Link } from "react-router-dom";
import {
    notification_event_update_notifications_width,
    notification_Item_height,
} from "../../../utils/notification/notifications.utils";
export const NotificationEventUpdateListItem = styled(List.Item)`
    padding: 19px 24px;
    max-width: ${notification_event_update_notifications_width}px;
    width: ${notification_event_update_notifications_width}px;
    height:${notification_Item_height}px;
    max-height: ${notification_Item_height}px;
`
export const TextDiv = styled.div`
    
`
export const EventLink = styled(Link)`
    
`
export const ConfirmButton = styled(Button)`
    
`