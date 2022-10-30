/* eslint-disable array-callback-return */
import { ITask } from "../../interfaces/task.interface"
import { getDateString, getDateTimeString } from '../date/date.utils'
import { getCurrentCoords } from "../googleMap/googleMap.utils";
import { defaultLatLng } from "../googleMap/googleMap.utils";
import { ITaskFormItemDetailWithImageRefAndUrl } from '../../interfaces/taskForm.interface';
import { getNumberofParticipants } from "../../interfaces/participate.interface";
import { IUser } from "../../interfaces/user.interface";

export const getUid = (uid: string) => {
    return uid+ '_' + Math.random().toString().replace(/\./,'');
}


//create a task based on id and organizer
export const baseTaskCreator =  async(
    id: string, 
    organizer: string,
): Promise<ITask> => {
    const task: ITask =  {
        id,
        title: '',
        organizer,
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        participants: [],
        reviews: [],
        hide: false,
        open:true,
        participantsNumber: 0,
        latLngAndAddress: {
            latLng: defaultLatLng,
            address: ''
        },
        description:'',
        showImages:[],
        frontCoverImage: null,
        keyWords: [],
        rate: [],
        category:'any'
    };
    return new Promise(async (resolve, reject)=>{
        await getCurrentCoords().then((location)=>{
            task.latLngAndAddress.latLng = location!;
            resolve(task);
        }).catch(_=> {
            reject(task);
        })
    });
}



//update a task base on form input
// export const taskCreator = (baseTask: ITask, props: ITaskInputTimeMoment):ITask => {
//     return {
//         ...baseTask,
//         ...props,
//         startDate: props.startDate ? getDateString(props.startDate): undefined,
//         startTime: props.startTime? getDateTimeString(props.startTime): undefined,
//         endDate: props.endDate? getDateString(props.endDate): undefined,
//         endTime: props.endTime? getDateTimeString(props.endTime) : undefined,
//     }
// }


//update a task base on form input
export const getUpdatedTask = (currentTask: ITask, formValues: ITaskFormItemDetailWithImageRefAndUrl): ITask =>{
    const { 
        title,
        description,
        hide,
        open,
        participantsNumber,
        startDate,
        startTime,
        endDate,
        endTime,
        latLngAndAddress,
        showImages,
        frontCoverImage,
        keyWords,
        category
    } = formValues;
    const startDateString = getDateString(startDate!)
    const startTimeString = getDateTimeString(startTime!)
    const endtDateString = getDateString(endDate!)
    const endTimeString = getDateTimeString(endTime!)

    return {
        ...currentTask,
        title,
        description,
        hide,
        open,
        participantsNumber,
        startDate: startDateString,
        startTime: startTimeString,
        endDate: endtDateString,
        endTime: endTimeString,
        latLngAndAddress,
        showImages,
        frontCoverImage,
        keyWords,
        category
    }

}

/**
 * check if the current attendees reachcthe maxmum
 * @param task checked task
 * @returns 
 */

export const checkIfTaskAttendeesReachMax = (task: ITask):boolean => {
    const {participantsNumber} = task;
    const participants = task.participants || [];
    const currentNumberOfParticipants = getNumberofParticipants(participants);
    return currentNumberOfParticipants >= participantsNumber;
}

/**
 * 
 * @param taskId the id of the task
 * @param users all the users
 */

export const getAllAttendeesByTask = (
    task: ITask,
    users: IUser[]
):IUser[] => {
    const participants = task.participants || [];
    const attendees = participants.filter(paticipant => paticipant.isConfirmed && paticipant.agreed);
    const attendeesUid = attendees.map(attendee => attendee.participantUid);
    return users.filter(user => attendeesUid.findIndex(uid => uid === user.uid) !== -1);
}