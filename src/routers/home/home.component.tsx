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
    SearchCol
} from './home.styles';
import { HomeSearch } from '../../components/home-search/home-search.component';
import { EventCardList } from '../../components/event-card-component/event-card-list/event-card-list.component';
import { GETAllTASKS, GETSEARCHTASKS } from '../../utils/graphql/query.utils';
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
import getSearchTasks from '../../../functions/src/input-search-tasks/input-search';

const pageTasksAmout = 12;


const Home: FC = () =>{
    const [ tasks, setTasks ] = useState<ITask[]>();
    const [ tasksTotalLength, setTasksTotalLength ] = useState<number>(0);
    const [ searchInputValue, setSearchInputValue ] = useState<string>('');
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    // const { data, loading, error} = useQuery(GETAllTASKS);

    const { data, loading, error} = useQuery(GETSEARCHTASKS,{
        variables: {
            input: searchInputValue,
            taskStartIndex: (currentPage - 1) * pageTasksAmout,
            amout: pageTasksAmout
        }
    });
    const { setCurrentMenuKey } = useContext(NavigationContext);

    console.log("data:" + data)
    console.log("loading:" + loading)
    console.log("error:" + error)


    useEffect(()=> {
        setCurrentMenuKey(MenuKey.HOME)
    },[setCurrentMenuKey])

    useEffect(()=>{
        // console.log('taskError:',error);
        // console.log('taskLoading:',loading);
        // console.log('tasksData:',data);
        const t:ITask[] = [];
        if(data && data.getSearchTasks) {
            // const {tasks} = data;
            const {totalLength, tasks} = data.getSearchTasks;
            setTasksTotalLength(totalLength);
            while(t.length< 100) {
                for (const task of tasks){
                    t.push(task);
                }
            }
            setTasks(t);    
            setTasks(tasks);    
        }
    },[error, data, loading]);

    const searchOnChangeHandle = useCallback((value: string)=>{
        setSearchInputValue(value);
    },[]);
    
    const onPageChangeHandle = useCallback((page: number)=>{
        setCurrentPage(page);
    },[setCurrentPage]);


   

    
    return (

        <HomeContainer>
            <SearchRow>
                {/* <Col {...searchColSideLayout} ></Col> */}
                <SearchCol {...tasksColMiddleLayout}>
                    <HomeSearch 
                        onChange={searchOnChangeHandle}
                        // value = {searchInputValue}
                    />
                </SearchCol>
                {/* <Col {...searchColSideLayout}></Col> */}
            </SearchRow>
            {
                (loading  || !tasks || error)?<Spin />:
                <>
                    <Row>
                        <ListCol span={24}>
                            <EventCardList 
                                tasks={tasks}
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
        </HomeContainer>
    )
}

export default Home;