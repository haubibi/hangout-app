import styled from "styled-components";
import { Card } from 'antd';
import { 
    Col,
    Row
 } from 'antd';
import { cardWidth } from '../../../utils/default-settings/card.setting';
import { 
    strangeFontFamily, 
    eventCardTitleFontSize,
} from "../../../utils/default-settings/font.settings";
import { 
    textOverFlowElilipsis,
    FlexDisplayRowCenter
 } from "../../../App.styles";

export const EventCardCon = styled(Card)`
    width: ${cardWidth}px;
    min-width: ${cardWidth}px;
    overflow: hidden;
    border-radius: 10px;
    &:hover {
        transform: scale(1.05);
    }
    .ant-card-head>.ant-card-head-wrapper>.ant-card-head-title{
        font-family: ${strangeFontFamily};
        font-size: ${eventCardTitleFontSize}px;
        font-weight: bolder;
        padding: 10px 0;
    }
    .ant-card-body{
        padding: 6px;
    }
    .ant-card-actions{
        width: ${cardWidth}px;
    }
    /* .ant-card-cover{
        cursor: pointer;
    } */
`;


const { Meta } = EventCardCon; 

export const MetaCon = styled(Meta)`
    padding: 10px;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    & div {
        line-height: 40px;
    }
    .ant-card-meta-avatar{
        ${FlexDisplayRowCenter}
    }

    &>.ant-card-meta-detail>div{
        width: 100%;
        text-align: left;
        max-width: 240px;
        height: 40px;
        ${textOverFlowElilipsis}
    }
`


export const ContentRow = styled(Row)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;

export const ContentCol = styled(Col)`
    width: 100%;
    padding: 0px 10px 0px 10px;
`;
export const CardTextSpan = styled.span`
    padding-left: 15px;
    ${textOverFlowElilipsis}
`;
export const LocationAndPatCol = styled(Col)`
    padding: 10px 0px 10px 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`;
export const TitleDiv = styled.div`
    line-height: 40px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
`;



export const PopoverContentDiv = styled.div`
    text-align: left;
`

export const AttendeeDateRow = styled(Row)`
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
export const AttendeeCol = styled(Col)`
    min-width: 250px;
    padding: 5px 40px 0px 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    column-gap: 10px;
    span {
        font-weight: 700;
    }
`;
export const DateStatusCol = styled(Col)`
`;
export const AttendeesSpan = styled.span`
    min-width: 250px;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
