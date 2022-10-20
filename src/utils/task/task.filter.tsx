/* eslint-disable max-len */
import {
    ITask,
    IFilterTasks,
    ITasksFilterInput,
    DistanceRange,
    ParticipantsRange,
    EventCategory,
    TaskStatusType,
    IMyTaskFilterInput
} from "../../interfaces/task.interface";
import {LatLngLiteral} from "../../interfaces/google.interface";import {getDistanceBetweenPoints} from "../googleMap/getDistanceBetweenLatLng.utils";
import { Moment } from 'moment';
import { 
  getMomentByDateAndTimeString,
  getCurrentMoment,
  getDateString,
  getDateTimeString
} from "../date/date.utils";
import { DateRangeValueType } from "../../interfaces/time.interface";
// export const checkIfTaskExpired = (
//   task: ITask
// ):boolean => {
//   const {startDate, startTime} = task;
//   const startMoment = getMomentByDateAndTimeString(startDate, startTime);

//   return startMoment.is
// }


/**
 * get my Events
 * 
 * @param type organize or attend
 * @param userUid user uid
 * @param tasks all the tasks
 * @param taskStatus status of the task 
 * @returns 
 */

export const getMyTasks= ({
  type,
  userUid,
  tasks,
  taskStatus,
  sortByDate
}: IMyTaskFilterInput):ITask[] =>{
  let myTasks:ITask[] = [];
  if(type === 'organize'){
      myTasks = tasks.filter(task => task.organizer === userUid);
    } else {
      myTasks = tasks.filter(task => {
          const index = task.participants.findIndex(participant => {
              const {isConfirmed, agreed, participantUid} = participant;
              return participantUid === userUid &&
                    isConfirmed &&
                    agreed
          });
          return index === -1? false: true;
      });
  }

  if(sortByDate) {
    myTasks.sort((task1, task2) => {
        const startMoment1 = getMomentByDateAndTimeString(task1.startDate, task1.startTime);
        const startMoment2 = getMomentByDateAndTimeString(task2.startDate, task2.startTime);
        return startMoment1.isBefore(startMoment2)? -1: 1;
    });
  }

  switch(taskStatus) {
    case 'all':
        return myTasks;
    case 'outOfDate':
        return myTasks.filter(task => {
            const { startDate, startTime} = task;
            const startMoment = getMomentByDateAndTimeString(startDate, startTime);
            const currentTime = getCurrentMoment();
            return startMoment.isBefore(currentTime);
        });
    case 'withinDate':
        return myTasks.filter(task => {
            const { startDate, startTime} = task;
            const startMoment = getMomentByDateAndTimeString(startDate, startTime);
            const currentTime = getCurrentMoment();
            return startMoment.isSameOrAfter(currentTime);
        });
  }



}



/**
 * 
 * @param tasks all the tasks
 * @param category category 
 * @returns 
 */

export const getFilteredTasksByCategory = (
  category: EventCategory,
  tasks: ITask[]
):ITask[] => {
    return category === 'any'? tasks: tasks.filter(task => task.category === category);
};

/**
 * 
 * @param currentLatLng curretn latlng
 * @param distanceRange distance range
 * @param tasks all the tasks
 * @returns tasks in the distance range
 */

export const getFilteredTasksByDistance = (
      currentLatLng: LatLngLiteral,
      distanceRange: DistanceRange,
      tasks: ITask[]
  ):ITask[] => {
    return tasks.filter((task:ITask) => {
      console.log("latLngAndAddress:", task.latLngAndAddress, "currentLatLng:", currentLatLng);
      const distance = getDistanceBetweenPoints(currentLatLng, task.latLngAndAddress.latLng);
  
      // console.log("distance:"+ distance);
  
      return distance >= distanceRange[0] && distance <= distanceRange[1];
    });
  };
  
  /**
   * 
   * @param paticipantsRange range of participants
   * @param tasks all the tsaks
   * @returns tasks in the participants range
   */
  const getFilteredTasksByNumberOfPaticipants = (
      paticipantsRange: ParticipantsRange,
      tasks: ITask[]
  ): ITask[] => {
    return tasks.filter((task)=> task.participantsNumber>=paticipantsRange[0] && task.participantsNumber<=paticipantsRange[1]);
  };


/**
 * 
 * @param tasks all the task has to be filtered
 * @param dateRange [Moment, Monemnt] | [null, Monemnt] | [Moment, null]
 * @returns filtered tasks
 */


export const getTasksWithinDateRange = (
    tasks: ITask[],
    dateRange: DateRangeValueType,
):ITask[] =>{
  const currentMoment = getCurrentMoment();
  console.log("date range:", dateRange)
  //if date range is null, user didn't pick the date range
  if (!dateRange || (!dateRange[0] && !dateRange[1])) return tasks.filter(task => {
    const { startDate, startTime} = task;
    const startMoment =  getMomentByDateAndTimeString(startDate, startTime);
    return startMoment.isSameOrAfter(currentMoment, 'day');
  });

  //if the start date is null, user didn't pick the start date
  if (!dateRange[0] && dateRange[1]) return tasks.filter(task =>{
      const { startDate, startTime, endDate, endTime} = task;
      const startMoment =  getMomentByDateAndTimeString(startDate, startTime);
      const endMoment =  getMomentByDateAndTimeString(endDate, endTime);
      return  startMoment.isSameOrAfter(currentMoment, 'day') && 
              endMoment.isSameOrBefore(dateRange[1], 'day');
  });

  //if the end date is null, user didn't pick the end date
  if (dateRange[0] && !dateRange[1]) return tasks.filter(task =>{
      const { startDate, startTime} = task;
      const startMoment =  getMomentByDateAndTimeString(startDate, startTime);
      return  startMoment.isSameOrAfter(currentMoment, 'day') && 
              startMoment.isSameOrAfter(dateRange[0], 'day');
  });


  //if both start time and end time are picked
  if (dateRange[0] && dateRange[1]) return tasks.filter(task =>{
    const { startDate, startTime, endDate, endTime} = task;
    const startMoment =  getMomentByDateAndTimeString(startDate, startTime);
    const endMoment =  getMomentByDateAndTimeString(endDate, endTime);
    return  startMoment.isSameOrAfter(currentMoment, 'day') &&
            startMoment.isSameOrAfter(dateRange[0], 'day') && 
            endMoment.isSameOrBefore(dateRange[1], 'day')
  });
}


/**
 * filter the tasks that are out of date
 * @param tasks tasks has to be filtered
 * @returns 
 */

export const filterOutOfDateTasks = (
  tasks: ITask[]
):ITask[] =>{
  const currentMoment = getCurrentMoment();
  return tasks.filter(task => {
      const {startDate, startTime} = task;
      const startMoment =  getMomentByDateAndTimeString(startDate, startTime);
      return startMoment.isSameOrAfter(currentMoment, 'day');
  });
}

/**
 * filter the tasks that has been hidden
 * @param tasks tasks has to be filtered
 * @returns 
 */

export const filterHiddenTasks = (
  tasks: ITask[]
):ITask[] =>{
  return tasks.filter(task => !task.hide);
}


  /**
   * 
   * @param tasks all the tasks need to be filtered
   * @param taskFilter filter of the tasks
   * @param currentLatLng lat & lng of the location
   * @param IfFilterOutOfDateTasks if show the events out of date
   * @param ifFilterHiddenTasks if show the events that has been hidden
   * @returns qulified tasks 
   */

  export const getFilteredTasks = ({
      tasks,
      taskFilter,
      currentLatLng,
      IfFilterOutOfDateTasks,
      ifFilterHiddenTasks
  }:ITasksFilterInput):ITask[] => {
  
    let filteredTasks: ITask[] = tasks? tasks:[];
    // filter by distance
    if (currentLatLng) {
      if (taskFilter?.distanceRange) {
        // console.log("distanceRange:" + taskFilter.distanceRange);
        filteredTasks = getFilteredTasksByDistance(currentLatLng, taskFilter.distanceRange, tasks);
      }
    }
    // filter by category
    if (taskFilter?.category) {
      filteredTasks = getFilteredTasksByCategory(taskFilter.category, filteredTasks);
    }
    // filter by number of participants
    if (taskFilter?.participantsRange) {
      filteredTasks = getFilteredTasksByNumberOfPaticipants(taskFilter.participantsRange, filteredTasks);
    }

    //filter by date range
    if (taskFilter?.dateRange) {
      filteredTasks = getTasksWithinDateRange(filteredTasks, taskFilter.dateRange);
    }

    //if show the events out of date
    if(IfFilterOutOfDateTasks) {
      filteredTasks = filterOutOfDateTasks(filteredTasks);
    }

    //if show the events has been hidden
    if(ifFilterHiddenTasks) {
      filteredTasks = filterHiddenTasks(filteredTasks);
    }

    console.log(filteredTasks)
  
    return [...filteredTasks];
  };

  

  
  