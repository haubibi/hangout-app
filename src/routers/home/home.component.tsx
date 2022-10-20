import { 
    FC, 
    useState,
    useEffect,
    useContext,
    useCallback,
} from 'react';
import {
    HomeContainer, 
    ListCol,
    SearchRow,
    SearchCol,
    ErrorH2
} from './home.styles';
import { HomeSearch } from '../../components/home-search/home-search.component';
import { EventCardList } from '../../components/event-card-component/event-card-list/event-card-list.component';
import { GET_All_TASKS } from '../../utils/graphql/query.utils';
import { PaginationBar } from '../../components/pagination/pagination.component'
import { 
    EventCategory,
    ITask,
    ITasksFilterInput
 } from '../../interfaces/task.interface';
import { 
    Col,
    Row,
    Spin
} from 'antd';
import { NavigationContext } from '../../context/navigation.context';

import { useQuery } from '@apollo/client';
import { 
    tasksColMiddleLayout,
} from '../../utils/layout-antdesign/layout';
import { MenuKey } from '../../context/navigation.context';
import getSearchTasks from '../../utils/task/task.fuse';
import { getFilteredTasks } from '../../utils/task/task.filter';
import { message } from 'antd';
import { TasksContext } from '../../context/tasks.context';
const pageTasksAmout = 12;
const initialCategory:EventCategory = 'any';

const Home: FC = () =>{
    const { allTasks, refetchAllTasks, fetchAllTasksLoading, fetchAllTasksError } = useContext(TasksContext);
    const [ tasks, setTasks ] = useState<ITask[]>();
    const [ tasksTotalLength, setTasksTotalLength ] = useState<number>(0);
    const [ searchInputValue, setSearchInputValue ] = useState<string>('');
    const [ category, setCategory ] = useState<EventCategory>(initialCategory);
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    // const { data, loading, error, refetch} = useQuery(GET_All_TASKS);
    const { setCurrentMenuKey } = useContext(NavigationContext);

    // console.log("data:", data)
    // console.log("loading:" , loading)
    // console.log("error:" , error)

    //set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.HOME);
    },[setCurrentMenuKey]);

    //refetch all the tasks every time
    useEffect(()=> {
        refetchAllTasks();
    },[refetchAllTasks]);

    useEffect(()=>{
        if(allTasks) {
            // const {tasks} = data;
            const tasksAndTotalLength = getSearchTasks(
                allTasks,
                searchInputValue,
                (currentPage - 1) * pageTasksAmout,
                pageTasksAmout,
            );
            const {tasks, totalLength} = tasksAndTotalLength;
            const filteredTasks = getFilteredTasks({
                tasks,
                taskFilter: {
                    category
                },
                IfFilterOutOfDateTasks: true,
                ifFilterHiddenTasks: true
            })
            // setTasks(filteredTasks.concat(filteredTasks));
            setTasks(filteredTasks);
            setTasksTotalLength(totalLength);
        }
    },[allTasks, currentPage, setTasksTotalLength, setTasks, searchInputValue, category]);

    const searchOnSearchHandle = useCallback((value: string, category: EventCategory)=>{
        setSearchInputValue(value);
        setCategory(category);
    },[]);
    
    const onPageChangeHandle = useCallback((page: number)=>{
        setCurrentPage(page);
    },[setCurrentPage]);

    return (

        <HomeContainer>
            <SearchRow>
                <SearchCol {...tasksColMiddleLayout}>
                    <HomeSearch
                        initialCategory = {initialCategory}
                        onSearch={searchOnSearchHandle}
                        loading = {fetchAllTasksLoading}
                    />
                </SearchCol>
            </SearchRow>
            <>
            {
                fetchAllTasksLoading? <Spin /> :
                fetchAllTasksError? 
                    message.error(fetchAllTasksError.toString(), 5)
                    .then(()=> message.info(`Please try again!`)):
                        tasks && tasks.length === 0?
                        <ErrorH2>No matched event, please try again!</ErrorH2>:
                        <>
                            <Row>
                                <ListCol span={24}>
                                    <EventCardList 
                                        tasks={tasks}
                                        tasksRefetch = {refetchAllTasks}
                                    />
                                </ListCol>
                            </Row>
                            <Row style={{margin:'50px 0px 50px 0px'}} gutter= {30}>
                                <Col span = {6}></Col>
                                <Col span = {12}>
                                    <PaginationBar 
                                        onChange={onPageChangeHandle}
                                        total = {tasksTotalLength}
                                        pageSize = {pageTasksAmout}
                                    />
                                </Col>
                                <Col span = {6}></Col>
                            </Row>
                        </>
            }

           </>
        </HomeContainer>
    )
}

export default Home;