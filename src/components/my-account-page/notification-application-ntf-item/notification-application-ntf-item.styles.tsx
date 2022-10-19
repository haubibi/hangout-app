import styled from "styled-components";
import { List, Button } from "antd";
import { Link } from "react-router-dom";
import {
    notification_application_notifications_width,
    notification_Item_height,
    notification_Item_bgColor
} from "../../../utils/notification/notifications.utils";
export const NotificationApplicationListItem = styled(List.Item)`
    padding: 19px 24px;
    max-width: ${notification_application_notifications_width}px;
    width: ${notification_application_notifications_width}px;
    height:${notification_Item_height}px;
    max-height: ${notification_Item_height}px;
    background-color: ${notification_Item_bgColor};
`
export const TextDiv = styled.div`
    
`
export const EventLink = styled(Link)`
    
`
export const ConfirmButton = styled(Button)`
    
`