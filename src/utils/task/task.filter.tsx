/* eslint-disable max-len */
import {
    ITask,
    IFilterTasks,
    DistanceRange,
    ParticipantsRange,
} from "../../interfaces/task.interface";
import {LatLngLiteral} from "../../interfaces/google.interface";import {getDistanceBetweenPoints} from "../googleMap/getDistanceBetweenLatLng.utils";
import { Moment } from 'moment';
import { 
  getMomentByDateAndTimeString,
  getDateString,
  getDateTimeString
} from "../date/date.utils";

// export const checkIfTaskExpired = (
//   task: ITask
// ):boolean => {
//   const {startDate, startTime} = task;
//   const startMoment = getMomentByDateAndTimeString(startDate, startTime);

//   return startMoment.is
// }


/**
 * 
 * @param currentLatLng curretn latlng
 * @param distanceRange distance range
 * @param tasks all the tasks
 * @returns tasks in the distance range
 */

  const getFilteredTasksByDistance = (
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
   * @param currentLatLng current latlng
   * @param taskFilter filter of the tasks
   * @param tasks all the tasks need to be filtered
   * @returns qulified tasks 
   */

  export const getFilteredTasks = (
      currentLatLng: LatLngLiteral,
      taskFilter: IFilterTasks,
      tasks: ITask[]
  ):ITask[] => {
  
    let filteredTasks: ITask[] = tasks;
    // filter by distance
    if (currentLatLng) {
      if (taskFilter.distanceRange) {
        // console.log("distanceRange:" + taskFilter.distanceRange);
        filteredTasks = getFilteredTasksByDistance(currentLatLng, taskFilter.distanceRange, tasks);
      }
    }
    // filter by number of participants
    if (taskFilter.participantsRange) {
      filteredTasks = getFilteredTasksByNumberOfPaticipants(taskFilter.participantsRange, filteredTasks);
    }
  
    return [...filteredTasks];
  };

  

  
  