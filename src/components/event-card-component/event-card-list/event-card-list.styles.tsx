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
    width:1600px;
    .ant-spin-nested-loading .ant-spin-container .ant-row {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between!important;
        align-items: center !important;
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


