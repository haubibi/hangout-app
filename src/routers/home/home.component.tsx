import { 
    FC, 
    useState,
    useEffect
} from 'react';
import { HomeContainer } from './home.styles';
import { HomeSearch } from '../../components/home-search/home-search.component';
import { EventCardList } from '../../components/event-card-list/event-card-list.component';
import { GETAllTASKS } from '../../utils/graphql/query.utils';
import { PaginationBar } from '../../components/pagination/pagination.component'
import { ITask } from '../../utils/interfaces/task.interface';
import { 
    Col,
    Row,
    Spin
} from 'antd';


import { useQuery } from '@apollo/client';
import { 
    tasksColSideLayout,
    tasksColMiddleLayout,
    searchColSideLayout,
    midColConfigue
} from '../../utils/layout-antdesign/layout';


const Home: FC = () =>{
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [ tasks, setTasks ] = useState<ITask[]>();
    const [ currentTasks, setCurrentTasks ] = useState<ITask[]>();
    const { data, loading, error} = useQuery(GETAllTASKS);


    const paginationOnChange = (page: number, pageSize: number) => {
        console.log(page, pageSize)
        setCurrentPage(page);
        setPageSize(pageSize);
    }


    useEffect(()=>{
        if(tasks){
            setCurrentTasks(tasks.slice(
                pageSize * (currentPage -1),
                pageSize * currentPage,
            ));
        }
    },[tasks, currentPage, pageSize])
    
    useEffect(()=>{
        if(data && data.tasks) {
            const t: ITask[] = [...data.tasks];
            for(let i = t.length; i< 100; i++) {
                t.push(data.tasks[0]);
            }
            // setTasks(data.tasks);
            
            setTasks(t);
        }
    },[error, data]);
    if(loading || !currentTasks || !tasks) return <Spin />;



    console.log(currentTasks.length)
    return (
        <HomeContainer>
            <Row>
                <Col {...searchColSideLayout} ></Col>
                <Col {...tasksColMiddleLayout}>
                    <HomeSearch />
                </Col>
                <Col {...searchColSideLayout}></Col>
            </Row>

            <Row>
                <Col {...tasksColSideLayout}></Col>
                <Col {...midColConfigue}>
                    <EventCardList 
                        tasks={currentTasks}
                    />
                </Col>
                <Col {...tasksColSideLayout}></Col>
            </Row>
            <Row style={{margin:'50px 0px 50px 0px'}} gutter= {30}>
                <Col span = {6}></Col>
                <Col span = {12}>
                    <PaginationBar 
                        onChange={paginationOnChange}
                        total = {tasks.length}
                        pageSize = {pageSize}
                    />
                </Col>
                <Col span = {6}></Col>
            </Row>
        </HomeContainer>
    )
}

export default Home;