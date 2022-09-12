import {
    Col
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


