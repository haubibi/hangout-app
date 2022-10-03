import React, {useEffect, useState, FC } from "react";
import { TaskFormContainer } from './task-form.styles';
import { TaskFormItem } from '../task-form-item/task-form-item.component';
import { Spin } from 'antd';
import { ITask } from "../../../interfaces/task.interface";

import { IUser } from '../../../interfaces/user.interface';
import { baseTaskCreator } from '../../../utils/task/task.utils';
import { useQuery } from '@apollo/client';
import { GETTASKBYID } from '../../../utils/graphql/query.utils';

interface ITaskFormprops {
    user: IUser;
    taskId: string;
}


export const TaskForm:FC<ITaskFormprops> = ({
    user,
    taskId
}) =>{
    const [ task, setTask ] = useState<ITask>();
    const { data, loading, error} = useQuery(GETTASKBYID,{
        variables: {
            id: taskId
        }
    });

    useEffect(()=>{
        const getTask = async() => {
            await baseTaskCreator(taskId, user!.uid).then((task)=>{
                setTask(task);
            });
        };
        if(error || (data && !data.getTaskById)){
            getTask();
        }
        if(data && data.getTaskById) {
            const {__typename, ...task} = data.getTaskById;
            setTask(task);
        }
    },[error, data, taskId, user]);
    // console.log(error, loading, data)
    if(loading || !task) return <Spin />;
    return ( 
        <TaskFormContainer>
            {/* <h2>this is a task form</h2> */}
            <TaskFormItem task= { task }></TaskFormItem>
        </TaskFormContainer>
    )
}


