import {
    List
} from 'antd';
import styled from "styled-components";
import { 
    cardWidth,
    cardColGap,
    cardRowGap
 } from '../../../utils/default-settings/card.setting';
import { FlexDisplayRowCenter } from '../../../App.styles';
export const EventCardListCon = styled.div`
`;


export const ListContainer = styled(List)`
    .ant-spin-nested-loading .ant-spin-container .ant-row {
        ${FlexDisplayRowCenter}
        column-gap: ${cardColGap}px;
        row-gap: ${cardRowGap}px;
        &>div{
            min-width: ${cardWidth}px !important;
        }
    }
    max-width: 2000px;
`

export const ListItem= styled(List.Item)`
    min-width: ${cardWidth}px;
    ${FlexDisplayRowCenter}
`


