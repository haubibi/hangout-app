import { 
    FC, 
    useState,
    useEffect,
    useContext,
    useMemo,
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
import { GETAllTASKS } from '../../utils/graphql/query.utils';
import { PaginationBar } from '../../components/pagination/pagination.component'
import { ITask } from '../../interfaces/task.interface';
import { 
    Col,
    Row,
    Spin
} from 'antd';
import { NavigationContext } from '../../context/navigation.context';

import { useQuery } from '@apollo/client';
import { 
    tasksColMiddleLayout,
    searchColSideLayout,
} from '../../utils/layout-antdesign/layout';
import { MenuKey } from '../../context/navigation.context';
import getSearchTasks from '../../utils/task/task.fuse';
import { message } from 'antd';

const pageTasksAmout = 12;


const Home: FC = () =>{
    const [ tasks, setTasks ] = useState<ITask[]>();
    const [ tasksTotalLength, setTasksTotalLength ] = useState<number>(0);
    const [ searchInputValue, setSearchInputValue ] = useState<string>('');
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const { data, loading, error, refetch} = useQuery(GETAllTASKS);
    const { setCurrentMenuKey } = useContext(NavigationContext);

    console.log("data:", data)
    console.log("loading:" , loading)
    console.log("error:" , error)

    //set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.HOME);
    },[setCurrentMenuKey]);

    //refetch every time
    useEffect(()=> {
        refetch();
    },[refetch]);

    useEffect(()=>{
        // console.log('taskError:',error);
        // console.log('taskLoading:',loading);
        // console.log('tasksData:',data);
        if(data && data.tasks) {
            // const {tasks} = data;
            const tasksAndTotalLength = getSearchTasks(
                data.tasks,
                searchInputValue,
                (currentPage - 1) * pageTasksAmout,
                pageTasksAmout,
            ); 
            const {totalLength, tasks} = tasksAndTotalLength;

            console.log("data:", data)
            console.log("searchInputValue:", searchInputValue)
            console.log("tasksAndTotalLength:", tasksAndTotalLength)

            setTasksTotalLength(totalLength);   
            setTasks(tasks.concat(tasks));    
        }
    },[data, currentPage, setTasksTotalLength, setTasks, searchInputValue]);

    const searchOnSearchHandle = useCallback((value: string)=>{
        setSearchInputValue(value);
    },[]);
    
    const onPageChangeHandle = useCallback((page: number)=>{
        setCurrentPage(page);
    },[setCurrentPage]);

    return (

        <HomeContainer>
            <SearchRow>
                <SearchCol {...tasksColMiddleLayout}>
                    <HomeSearch 
                        onSearch={searchOnSearchHandle}
                        loading = {loading}
                    />
                </SearchCol>
            </SearchRow>
            <>
            {
                loading? <Spin /> :
                    error? 
                    message.error(error.toString(), 5)
                    .then(()=> message.info(`Please try again!`)):
                        tasks && tasks.length === 0?
                        <ErrorH2>No matched event, please try again!</ErrorH2>:
                        <>
                            <Row>
                                <ListCol span={24}>
                                    <EventCardList 
                                        tasks={tasks}
                                        tasksRefetch = {refetch}
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