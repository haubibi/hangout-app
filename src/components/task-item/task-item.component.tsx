import { useContext, FC } from "react";
import { ITask } from "../../interfaces/task.interface";
import { useMutation } from "@apollo/client";
import { TaskCarousel } from '../task-carousel/task-carousel.component';
import { ADDPARTICIPANT } from "../../utils/graphql/mutation.utils";
import { 
    Button,
    Spin
 } from "antd";

import { 
    TaskitemContainer,
    TitleCon,
    DescriptionCon,
    RowCon,
    BaseCol,
    CenterAlignCol,
 } from './task-item.styles';
import { UserContext } from "../../context/user.context";
import { AddTaskRequestEnum } from '../../interfaces/notifications.interface';

interface ITaskItemProps{
    task: ITask
}

export const TaskItem:FC<ITaskItemProps> = ({
    task
}) => {
    const { currentUser } = useContext(UserContext);
    const [ addParticipant ] = useMutation(ADDPARTICIPANT);
    const { title, description, showImages, organizer } = task;
    console.log(task)

    const addParticipantBySelfFc = async (participantUid: string, taskId:string, requestType:AddTaskRequestEnum) => {
        console.log("participantUid:"+participantUid, "taskId:"+ taskId)
        await addParticipant({
            variables:{
                participantUid,
                taskId,
                addTaskRequestType: requestType,
            } 
        }).then(()=>{
            console.log(111)
            // navigate('/');
        });
    }

    const applyOnClick = (e: any ):void => {
        // MouseEventHandler<HTMLElement>
        const {uid} = currentUser;
        const {id} = task;
        console.log(uid, id)
        if(uid && id){
            console.log(uid, id)
            addParticipantBySelfFc(uid,id,AddTaskRequestEnum.PARTICIPANT_APPLY_REQUEST);
        }
    }

    if(!currentUser) return <Spin />
   return (
    <TaskitemContainer>
        <RowCon>
            <CenterAlignCol span={24}>
                <TitleCon> {title}</TitleCon>
            </CenterAlignCol>
        </RowCon>
        <RowCon>
            <CenterAlignCol span={24}>
                <DescriptionCon> {description}</DescriptionCon>
            </CenterAlignCol>
        </RowCon>
        <RowCon>
            <BaseCol span={6}></BaseCol>
                <CenterAlignCol span={12}>
                    <TaskCarousel images = {showImages}></TaskCarousel>
                </CenterAlignCol>
            <BaseCol span={6}></BaseCol>
        </RowCon>
        
        {
            organizer === currentUser!.uid ? null:
            <RowCon>
                <BaseCol span={6}></BaseCol>
                    <CenterAlignCol span={12}>
                        <Button type="primary" htmlType="button" onClick={ applyOnClick }>Attend</Button>
                    </CenterAlignCol>
                <BaseCol span={6}></BaseCol>
            </RowCon>
        }
        
        
    </TaskitemContainer>
   )
}
