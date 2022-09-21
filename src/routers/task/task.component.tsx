import React from "react";
import { TaskContainer } from './task.styles';
import { TaskItem } from "../../components/task-item/task-item.component";
import { useLocation } from 'react-router-dom';
import { ITask } from '../../interfaces/task.interface';
const Task = () =>{
    const location = useLocation();
    const task = location.state;
    // console.log(location)
    return (
        <TaskContainer>
            <h2>this is a task</h2>
            <TaskItem task = {task as ITask}></TaskItem>
        </TaskContainer>
    )
}

export default Task;