import { ITask } from '../interfaces/task.interface';
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
import { BaseTaskFormItemDetail } from '../interfaces/taskForm.interface';
import { cardTitleWidth } from '../utils/default-settings/card.setting';
import { ifTextWidthValid } from './validate.utils';
import { eventCardTitleFont } from '../utils/default-settings/font.settings';
import { getNumberofParticipants } from '../interfaces/participate.interface';

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

export const maxTitlelength = 20;
export const maxDescriptionLength = 500;
export const maxTagLength = 10;


export const disabledDate = (currentDate: Moment): boolean => currentDate.isBefore(getCurrentMoment(),'day');
/**
 * title validator
 * @param _ any
 * @param value event title 
 * @returns 
 */
const checkTitleValidator= (_: any, value: string) => {
    //check length
    const flag = ifTextWidthValid(value, cardTitleWidth, eventCardTitleFont);
    if(!flag || value.length > maxTitlelength) return Promise.reject(new Error(`The title is too long!`));
    return Promise.resolve(); 
}

/**
 *  description Validator
 * @param _ any
 * @param value event description
 * @returns 
 */

const checkDescriptionCallback = (_: any, value: string) => {
    //check length
    if(!validateStringLength(value,maxDescriptionLength)) return Promise.reject(new Error(`maximum characters is ${maxDescriptionLength}`)); 
    return Promise.resolve(); 
}


export const taskFormRules = {
    [TaskFormItemName.title] :[{ 
        required: true, 
        validator: checkTitleValidator
    }],
    [TaskFormItemName.description] :[{ 
        required: true, 
        validator: checkDescriptionCallback
    }],
    
}

export const validateFormValues = (values: BaseTaskFormItemDetail, task: ITask) => {
    const { 
        startDate,
        startTime,
        endDate,
        endTime,
        participantsNumber,
        latLngAndAddress
    } = values;
    const participants = task.participants || [];
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
    const currentNumberOfParticipants = getNumberofParticipants(participants);
    if(participantsNumber < currentNumberOfParticipants) {message.error(`Can't set less than ${currentNumberOfParticipants}`);return false;};
    //description already checked
    //latlng check
    if(!latLngAndAddress.address || latLngAndAddress.address.length === 0) {message.error(`Please select the address!}`);return false;};
    return true;
    //open 
    //hide
}