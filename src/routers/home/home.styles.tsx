import styled from "styled-components";
import { 
    List,
    Col,
    Row
 } from 'antd';
export const HomeContainer = styled.div`
    width: 100%;
    height: auto;
    /* height: 100%; */
`

export const ListCol = styled(Col)`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 50px;
    /* height: 100%; */
`
export const SearchCol = styled(Col)`
 
`
export const SearchRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const ErrorH2 = styled.h2`
    
`;