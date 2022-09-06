import React, {useEffect, useState, FC ,HTMLAttributes} from "react";
import { TaskFormContainer } from './task-form.styles';
import { TaskFormItem } from '../../components/task-form-item/task-form-item.component';
import { Spin, message } from 'antd';
import { baseTaskCreator } from "../../utils/task/task.utils";
import { ITask } from "../../utils/interfaces/task.interface";

import { LatLngLiteral } from "../../utils/interfaces/google.interface";
import { getCurrentCoords } from "../../utils/googleMap/googleMap.utils";

interface ITaskFormprops extends HTMLAttributes<HTMLDivElement> {
    setDefaultLoactionToCurrent: boolean;
}


const TaskForm = ({setDefaultLoactionToCurrent = true}) =>{
    const baseTask = baseTaskCreator();
    const [defaultTask, setDefaultTask] = useState<ITask>(baseTask);
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(()=>{
        const getCurrentCoordsAsync = async()=>{
            await getCurrentCoords().then((coor)=>{
                setDefaultTask({
                    ...baseTask,
                    location: coor!
                });
            })
            .catch(()=>{
                message.success('Please authorize the Location');
            });
            setLoading(false);
        }

        if(setDefaultLoactionToCurrent) {
            setLoading(true);
            getCurrentCoordsAsync();
        } else {
            setLoading(false);
            setDefaultTask(baseTask)
        }
      },[]);

    return ( 
        <TaskFormContainer>
            <h2>this is a task form</h2>
            {   
                loading ?  <Spin /> :
                <TaskFormItem defaultTask = {defaultTask}></TaskFormItem>
            }
        </TaskFormContainer>
    )
}


export default TaskForm;