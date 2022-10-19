import styled from "styled-components";
import { List } from "antd";

import { notification_request_notifications_width } from "../../../utils/notification/notifications.utils";


export const NotificationRequestListItem = styled(List.Item)`
    width: ${notification_request_notifications_width}px;   
    
`
export const NotificationRequestListItemMeta = styled(List.Item.Meta)`
    .ant-list-item-meta-content{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .ant-list-item-meta-description{
        min-width: 500px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
`