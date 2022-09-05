import {FC} from 'react';
import SearchInput from '../../components/searchInput/searchInput.conponent';
import { Col, Row, Divider} from 'antd';
import React from 'react';

import { gql, useQuery } from '@apollo/client';


// const USERS = gql`
//     query{
//         users {
//         displayName
//         }
//     }
// `;
// const TASK = gql`
//     query($id:String){
//         getTaskById(id:$id) {
//             title
//         }
//     }
// `;
// query($id:String){
//     getTaskById(id:$id) {
//       title
//       organizer {
//         displayName
//       }
//       description
//     }
//   }
// const TASK = gql`



const Home: FC = () =>{
    // const {data, loading, error} = useQuery(TASK,{
    //     variables: {
    //         id: "0"
    //     }
    // });

    // console.log('loading:',loading);
    // console.log('error:',error);
    // console.log('data:',data);
    return (
        <div>
            <Divider></Divider>
            <Row><Col span={24}></Col></Row>
            <Row>
                <Col span={12} offset = {6}>
                    <SearchInput />
                </Col>
            </Row>
            <Row>
                <Col span={24}></Col>
            </Row>
        </div>
    )
}

export default Home;