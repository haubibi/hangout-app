import React from "react";
import { TaskContainer } from './task.styles';
import { TaskItem } from "../../components/task-item/task-item.component";
const Task = () =>{
    return (
        <TaskContainer>
            <h2>this is a task</h2>
            <TaskItem></TaskItem>
        </TaskContainer>
    )
}

export default Task;