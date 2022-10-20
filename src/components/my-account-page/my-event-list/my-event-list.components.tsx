import {
    useEffect,
    useCallback,
    useState,
    useContext
} from 'react';
import { ITask } from '../../../interfaces/task.interface';
import { 
    ListCon,
    ContainerDiv
 } from './my-event-list.styles';
import { renderEventCard } from '../../event-card-component/event-card-list/event-card-list.component';
import { PaginationBar } from '../../pagination/pagination.component';
import getSearchTasks from '../../../utils/task/task.fuse';
const gridStyle = {
    gutter: 0,
    xs: 1,
    sm: 1,
    md: 2,
    lg: 2,
    xl: 3,
    xxl: 4,
};
export interface IMyEventListProps {
    tasks: ITask[]
}
const pageTasksAmout = 6;
export const MyEventList = ({
    tasks
}) => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ tasksTotalLength, setTasksTotalLength ] = useState<number>(0);
    const [ events, setEvents] = useState<ITask[]>(tasks);
    useEffect(()=>{
        if(tasks) {
            // const {tasks} = data;
            const tasksAndTotalLength = getSearchTasks(
                [...tasks],
                "",
                (currentPage - 1) * pageTasksAmout,
                pageTasksAmout,
            );
            setEvents(tasksAndTotalLength.tasks);  
            setTasksTotalLength(tasksAndTotalLength.totalLength);
        }
    },[currentPage, setEvents , tasks, setTasksTotalLength]);



    const onPageChangeHandle = useCallback((page: number)=>{
        setCurrentPage(page);
    },[setCurrentPage]);

    console.log(events)
    console.log(tasksTotalLength)

    return(
        <ContainerDiv>
            <ListCon
                // grid = {gridStyle}
                grid = {{column: 4}}     
                dataSource={events}
                renderItem = {renderEventCard}
            >
            </ListCon>
            <PaginationBar 
                onChange={onPageChangeHandle}
                total = {tasksTotalLength}
                pageSize = {pageTasksAmout}
            />
        </ContainerDiv>
    )
};

