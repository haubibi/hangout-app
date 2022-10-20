import { 
    TaskUpdateNotificationType,
    ApplicationNotificationType, 
    RequestNotificationType,
    frendRequestNotificationType,
    UnioNotificationType
} from '../../interfaces/notifications.interface';

const moment = require('moment');

export const notificationListHeight = 700;
export const notificationListWidth = 1000;
export const notificationListWidth_bgColor = `#f1f1f1`;

export const notification_Item_height= 100;
export const notification_Item_bgColor= `#f4f5f7`;  

export const notification_application_notifications_width = 750;  
export const notification_application_page_height = 700;  

export const notification_event_update_notifications_width = 750;  
export const notification_event_update_notifications_height = 700;  

export const notification_request_notifications_width = 750;  
export const notification_request_Task_width = 250;  
export const notification_request_Task_height= 100;
export const notification_request_Task_list_number= 7; 
export const notification_request_Task_Active_BgColor = `#e4e5e6`
export const notification_request_Task_InActive_BgColor = `#ffffff`


/**
 * get the request notifications sorted by task
 * @param taskId id of the task
 * @param notifications all the request notifications 
 */
export const getRequestNotificationsByTask = (
    taskId: string,
    notifications:RequestNotificationType[],
):RequestNotificationType[] =>{
    return notifications.filter(notification => notification.taskId === taskId);
}

/**
 * sort the notifications with time property
 * @param notifications 
 * @returns 
 */
export function sortNotificationsByTime (notifications: TaskUpdateNotificationType[]):TaskUpdateNotificationType[];
export function sortNotificationsByTime (notifications: ApplicationNotificationType[]):ApplicationNotificationType[];
export function sortNotificationsByTime (notifications: RequestNotificationType[]):RequestNotificationType[];
export function sortNotificationsByTime (notifications: frendRequestNotificationType[]):frendRequestNotificationType[];
export function sortNotificationsByTime (notifications: UnioNotificationType[]):UnioNotificationType[]{
    return notifications.sort((o1, o2)=> moment(o1.time).valueOf() - moment(o2.time).valueOf());
} 
