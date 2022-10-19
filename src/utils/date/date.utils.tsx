// import * as moment from 'moment';
import { Moment } from 'moment';
const moment = require('moment');

export const dateFormat = 'YYYY/MM/DD';
export const weekFormat = 'MM/DD';
export const monthFormat = 'YYYY/MM';
export const cardDateFormat = "MMM Do YY";
export const notificationDateFormat = "YYYY-MM-DD h:mm:s a";

export const FullFormat = "dddd, MMMM Do YYYY, h:mm:ss a";
const dateRex = new RegExp('(\\d{4})[-/](1[0,1,2]|0?\\d)[-/](3[0,1]|[1,2]\\d|0?\\d)');

/**
 * convert Moment to format 'YYYY-MM-DD' eg. "2014-09-08T08:02:17-05:00" 
 * @param m Moment
 * @returns string
 */
export const getDateString = (m: Moment): string => m.format('YYYY-MM-DD');

/**
 * convert Moment to format ISO 8601
 * @param m Moment
 * @returns string
 */
export const getDateTimeString = (m: Moment): string  => m.format()


/**
 * get current Moment
 * @returns Moment
 */

export const getCurrentMoment = (): Moment => moment();

/**
 * 
 * @param d string of Date you want to extract
 * @param t string of Time you want to extract
 * @returns Moment
 */
export const getMomentByDateAndTimeString = (d:string, t:string):Moment => moment(t.replace(dateRex, d));

/**
 * 
 * @param d string of Date you want to extract
 * @param t string of Time you want to extract
 * @returns string
 */

export const getMomentFullTimeString = (d:string, t:string) => getMomentByDateAndTimeString(d,t).format(FullFormat);

/**
 * check if time is before compared time
 * @param time time you want to compare string
 * @param comparedTime compared time string
 * @returns boolean
 */

export const getTimeIsBeforeComparedTime = (time: string, comparedTime: string) => moment(time).isBefore(moment(comparedTime));


/**
 * check if current time is before compared time
 * @param comparedTime compared time string
 * @returns boolean
 */

export const getCurrentTimeIsBeforeComparedTime = (comparedTime: string) =>  moment().isBefore(moment(comparedTime));


export const getNumberOfDaysFromNow = (d:string, t:string) => getMomentByDateAndTimeString(d,t).diff(moment(), 'days');

export const getNotificationDate = (time: string) => moment(time).format(notificationDateFormat);