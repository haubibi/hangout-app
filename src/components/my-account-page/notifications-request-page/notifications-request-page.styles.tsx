import styled from "styled-components";
import { 
    Row,
    Col
 } from "antd";
import { 
    notification_request_notifications_width,
    notification_request_Task_width,
} from "../../../utils/notification/notifications.utils";

// import { notificationPageWidth } from "../../../utils/notification/notifications.utils";

export const NotificationRequestPageContainer = styled.div`
    width: ${notification_request_notifications_width + notification_request_Task_width}px;
`

export const Rowpage = styled(Row)`
    width: ${notification_request_notifications_width + notification_request_Task_width}px;
    `;
export const ColEventList = styled(Col)`
    width: ${notification_request_Task_width}px;

`;
export const ColNotificationList = styled(Col)`
    width: ${notification_request_notifications_width}px;
`;
