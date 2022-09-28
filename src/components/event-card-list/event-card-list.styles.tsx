import {
    Col,
    List
} from 'antd';
import styled from "styled-components";
import { cardWidth } from '../../utils/layout-antdesign/layout';
export const EventCardListCon = styled.div`
`;

export const ColContainer = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-width: ${cardWidth}px;
`
export const ListContainer = styled(List)`
   .ant-spin-container>.ant-row>div>.ant-col{
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-top:40px;
   }
   .ant-list-pagination{
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding:40px 0px 40px 0px;
   }
   max-width: 2000px;
`

export const ListItem= styled(List.Item)`
`


