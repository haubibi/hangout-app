import { ITask } from '../../interfaces/task.interface';
import { RequestNotificationType } from '../../interfaces/notifications.interface';
import { getMomentByDateAndTimeString } from '../date/date.utils';
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
    notifications:RequestNotificationType[]
):RequestNotificationType[] =>{
    return notifications.filter(notification => notification.taskId === taskId);
}