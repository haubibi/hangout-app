import styled from "styled-components";
import { Card } from 'antd';
import { 
    Avatar,
    Col,
    Row
 } from 'antd';
 import { cardWidth } from '../../utils/layout-antdesign/layout';
export const EventCardCon = styled(Card)`
    width: ${cardWidth}px;
    &:hover {
        transform: scale(1.1);
    }
`;

export const ContentRow = styled(Row)`
    width: 100%;
    
`;

export const ContentCol = styled(Col)`
    
`;

export const TitleDiv = styled.div`
    display: inline-block;
    flex: 1 1;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

