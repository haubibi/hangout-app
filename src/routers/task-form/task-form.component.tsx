import { TaskFormContainer } from './task-form.styles';
import { TaskFormItem } from '../../components/task-form-item/task-form-item.component';
import React from "react";
const TaskForm = () =>{
    return (
        <TaskFormContainer>
            <h2>this is a task form</h2>
            <TaskFormItem></TaskFormItem>
        </TaskFormContainer>
    )
}


export default TaskForm;