import { 
    FC, 
    useState,
    useEffect
} from 'react';
import {
    HomeContainer, 
    ListCol 
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


import { useQuery } from '@apollo/client';
import { 
    tasksColSideLayout,
    tasksColMiddleLayout,
    searchColSideLayout,
    midColConfigue
} from '../../utils/layout-antdesign/layout';


const Home: FC = () =>{
    const [ tasks, setTasks ] = useState<ITask[]>();
    const { data, loading, error} = useQuery(GETAllTASKS);

    useEffect(()=>{
        // console.log('taskError:',error);
        // console.log('taskLoading:',loading);
        // console.log('tasksData:',data);
        const t:ITask[] = [];
        if(data && data.tasks) {
            
            while(t.length< 100) {
                for (const task of data.tasks){
                    t.push(task);
                }
            }
            setTasks(t);    
        }
    },[error, data, loading]);
    if(loading  || !tasks) return <Spin />;
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
                <ListCol>
                    <EventCardList 
                        tasks={tasks}
                    />
                </ListCol>
            </Row>
            {/* <Row style={{margin:'50px 0px 50px 0px'}} gutter= {30}>
                <Col span = {6}></Col>
                <Col span = {12}>
                    <PaginationBar 
                        onChange={paginationOnChange}
                        total = {tasks.length}
                        pageSize = {pageSize}
                    />
                </Col>
                <Col span = {6}></Col>
            </Row> */}
        </HomeContainer>
    )
}

export default Home;