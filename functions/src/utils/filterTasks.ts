/* eslint-disable max-len */
import {
  ITask,
  IFilterTasks,
  DistanceRange,
  ParticipantsRange,
} from "../interfaces/task.interface";
import {LatLngLiteral} from "../interfaces/google.interface";
import getTasks from "./getTasks";
import {getDistanceBetweenPoints} from "./getDistanceBetweenLatLng";

const getFilteredTasksByDistance = (
    currentLatLng: LatLngLiteral,
    distanceRange: DistanceRange,
    tasks: ITask[]
):ITask[] => {
  return tasks.filter((task:ITask) => {
    // console.log("latLngAndAddress:", task.latLngAndAddress, "currentLatLng:", currentLatLng);
    const distance = getDistanceBetweenPoints(currentLatLng, task.latLngAndAddress.latLng);

    // console.log("distance:"+ distance);

    return distance >= distanceRange[0] && distance <= distanceRange[1];
  });
};


const getFilteredTasksByNumberOfPaticipants = (
    paticipantsRange: ParticipantsRange,
    tasks: ITask[]
):ITask[] => {
  return tasks.filter((task)=> task.participantsNumber>=paticipantsRange[0] && task.participantsNumber<=paticipantsRange[1]);
};

export const getFilteredTasks = async (
    currentLatLng: LatLngLiteral,
    taskFilter: IFilterTasks
):Promise<ITask[]> => {
  // get all the tasks
  let tasks = await getTasks();

  // console.log("all tasks:", tasks);
  // console.log("currentLatlng:" + currentLatLng);
  // console.log("distanceRange:" + taskFilter.distanceRange);
  // filter by distance
  if (currentLatLng) {
    if (taskFilter.distanceRange) {
      // console.log("distanceRange:" + taskFilter.distanceRange);
      tasks = getFilteredTasksByDistance(currentLatLng, taskFilter.distanceRange, tasks);
    }
  }
  // console.log("all tasks distance filtered:", tasks);
  // filter by number of participants
  if (taskFilter.participantsRange) {
    tasks = getFilteredTasksByNumberOfPaticipants(taskFilter.participantsRange, tasks);
  }

  return tasks;
};
