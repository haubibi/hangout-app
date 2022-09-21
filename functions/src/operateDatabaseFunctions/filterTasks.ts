/* eslint-disable max-len */
import {
  ITask,
  IFilterTasks,
  DistanceRange,
  PaticipantsRange,
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
    const distance = getDistanceBetweenPoints(currentLatLng, task.latLngAndAddress.latLng);
    return distance >= distanceRange[0] && distance <= distanceRange[1];
  });
};


const getFilteredTasksByNumberOfPaticipants = (
    paticipantsRange: PaticipantsRange,
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
  // filter by distance
  if (taskFilter.distanceRange) {
    tasks = getFilteredTasksByDistance(currentLatLng, taskFilter.distanceRange, tasks);
  }
  // filter by number of participants
  if (taskFilter.paticipantsRange) {
    tasks = getFilteredTasksByNumberOfPaticipants(taskFilter.paticipantsRange, tasks);
  }

  return tasks;
};
