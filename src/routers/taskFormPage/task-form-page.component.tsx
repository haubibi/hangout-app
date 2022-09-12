import React, {useContext} from "react";
import { 
    Spin
 } from "antd";
import { useParams } from "react-router-dom";
import { TaskForm } from "../../components/task-form/task-form.component";
import { TaskFormPageContainer } from './task-form-page.styles';
import { UserContext } from '../../context/user.context';

const TaskFormPage = () =>{
    const { currentUser } =  useContext(UserContext);
    const { taskId} = useParams();
    if(!currentUser) return <Spin/>;
    return (
        <TaskFormPageContainer>
            <h2>this is a task form page</h2>
            <TaskForm
                user = {currentUser}
                taskId = {taskId!}
            />
        </TaskFormPageContainer>
    )
}

export default TaskFormPage;