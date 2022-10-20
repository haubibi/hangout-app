import styled from "styled-components";
import { Pagination } from 'antd';
export const PaginationContainer = styled.div`
`
export const PaginationUl = styled(Pagination)`
    max-width: 2000px;
    &>li {
        margin: 10px 0px 10px 10px;
    }
`