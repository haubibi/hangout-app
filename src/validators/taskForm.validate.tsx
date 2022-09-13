import { ITaskFormItemDetail, ITask } from '../utils/interfaces/task.interface';
import { 
    getMomentByDateAndTimeString,
    getDateString,
    getDateTimeString,
    getCurrentMoment
 } from '../utils/date/date.utils';
import { Moment } from 'moment';
import { message } from 'antd';
import {
    validateStringLength
} from './validate.utils';

export enum TaskFormItemName {
    title = 'title',
    startDate = 'startDate',
    startTime = 'startTime',
    endDate = 'endDate',
    endTime = 'endTime',
    description = 'description',
    frontCoverImage = 'frontCoverImage',
    showImages = 'showImages',
    participantsNumber = 'participantsNumber',
    latLngAndAddress = 'latLngAndAddress',
    open = 'open',
    hide = 'hide',
    keyWords = 'keyWords',
}

export const maxTitlelength = 10;
export const maxDescriptionLength = 500;
export const maxTagLength = 5;



const checkTitleCallback = (_: any, value: string) => {
    //check length
    if(!validateStringLength(value,maxTitlelength)) return Promise.reject(new Error(`maximum characters is ${maxTitlelength}`)); 
    return Promise.resolve(); 
}
const checkDescriptionCallback = (_: any, value: string) => {
    //check length
    if(!validateStringLength(value,maxDescriptionLength)) return Promise.reject(new Error(`maximum characters is ${maxDescriptionLength}`)); 
    return Promise.resolve(); 
}


export const taskFormRules = {
    [TaskFormItemName.title] :[{ 
        required: true, 
        validator: checkTitleCallback
    }],
    [TaskFormItemName.description] :[{ 
        required: true, 
        validator: checkDescriptionCallback
    }],
    
}

export const validateFormValues = (values: ITaskFormItemDetail, task: ITask) => {
    const { 
        startDate,
        startTime,
        endDate,
        endTime,
        participantsNumber,
        latLngAndAddress
    } = values;
    const { participants } = task;
    const currentParticipantsNumbe = participants.length;
    //title already checked
    //time validate
    const currentMoment =  getCurrentMoment();
    const startTimeMoment = getMomentByDateAndTimeString(getDateString(startDate as Moment), getDateTimeString(startTime as Moment));
    const endTimeMoment = getMomentByDateAndTimeString(getDateString(endDate as Moment), getDateTimeString(endTime as Moment));
    if(startTimeMoment.isBefore(currentMoment)) {message.error('Please selet correct start time!');return false;}
    if(
        endTimeMoment.isBefore(currentMoment) ||
        endTimeMoment.isBefore(startTimeMoment)
    ) {message.error('Please selet correct end time!');return false;};
    //paticipate numbers
    if(participantsNumber < currentParticipantsNumbe) {message.error(`Can't set less than ${currentParticipantsNumbe}`);return false;};
    //description already checked
    //latlng check
    if(!latLngAndAddress.address || latLngAndAddress.address.length === 0) {message.error(`Please select the address!}`);return false;};
    return true;
    //open 
    //hide
}