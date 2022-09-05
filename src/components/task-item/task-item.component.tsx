import React, {HTMLAttributes} from "react";
import { TaskitemContainer } from './task-item.styles';
import { ITask } from "../../utils/interfaces/task.interface";

interface ITaskItemProps extends HTMLAttributes<HTMLDivElement> {
    task: ITask
}

export const TaskItem = ({}) => {
   return (
    <TaskitemContainer>

    </TaskitemContainer>
   )
}
