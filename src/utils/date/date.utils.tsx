// import * as moment from 'moment';
import { Moment } from 'moment';
const moment = require('moment');


export const dateFormat = 'YYYY/MM/DD';
export const weekFormat = 'MM/DD';
export const monthFormat = 'YYYY/MM';
export const cardDateFormat = "MMM Do YY";

export const FullFormat = "dddd, MMMM Do YYYY, h:mm:ss a";
const dateRex = new RegExp('(\\d{4})[-/](1[0,1,2]|0?\\d)[-/](3[0,1]|[1,2]\\d|0?\\d)');


export const getDateString = (m: Moment): string => m.format('YYYY-MM-DD');

export const getDateTimeString = (m: Moment): string  => m.format()

export const getCurrentMoment = (): Moment => moment();
export const getMomentByDateAndTimeString = (d:string, t:string):Moment => moment(t.replace(dateRex, d));



export const getCurrentFullTimeString = (d:string, t:string) => getMomentByDateAndTimeString(d,t).format(FullFormat);

export const getTimeIsBeforeComparedTime = (currentTime: string, comparedTime: string) => moment(currentTime).isBefore(moment(comparedTime));

export const getCurrentTimeIsBeforeComparedTime = (comparedTime: string) =>  moment().isBefore(moment(comparedTime));


export const getNumberOfDaysFromNow = (d:string, t:string) => getMomentByDateAndTimeString(d,t).diff(moment(), 'days');
