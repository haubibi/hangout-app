/* eslint-disable @typescript-eslint/no-unused-vars */
import Fuse from 'fuse.js';
import { ITask, ISearchTaskReturnType } from '../interfaces/task.interface';
import getTasks from '../utils/getTasks';
import * as _ from "lodash";

const options = {
    includeScore: true,
    // Search in `author` and in `tags` array
    keys: [
            {
                name: 'title',
                weight: 1
            },
            {
                name: 'description',
                weight: 0.8
            },
            {
                name: 'keyWords',
                weight: 0.8
            },
            {
                name: 'address',
                getFn: (task: ITask)=> task.latLngAndAddress.address,
                weight: 0.8
            }, 
        ]
};
/**
 * 
 * @param input value of the search input 
 * @param startIndex start index of the task
 * @param amout 
 * @returns 
 */

const getSearchTasks = async (
    input: string,
    taskStartIndex: number,
    amout: number,
): Promise<ISearchTaskReturnType>=> {
    const tasks = await getTasks(); 
    console.log("tasks:", tasks)
    const fuse = new Fuse(tasks, options);
    let newTasks:ITask[] = [];
    let totalLength:number;
    if(input === "") {
        newTasks = [...tasks];
        totalLength = newTasks.length;
    } else {
        const result = fuse.search(input);
        const startIndex = taskStartIndex < result.length? taskStartIndex: result.length-1;
        const endIndex = (startIndex + amout) < result.length? (startIndex + amout): result.length;
        newTasks = _.slice(result.map(taskResult => taskResult.item), startIndex, endIndex);
        totalLength = result.length;
    }
    return {
        tasks: newTasks,
        totalLength
    };
}

export default getSearchTasks;