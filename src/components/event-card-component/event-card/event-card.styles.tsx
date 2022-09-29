import styled from "styled-components";
import { Card } from 'antd';
import { 
    Col,
    Row
 } from 'antd';
import { cardWidth } from '../../../utils/layout-antdesign/layout';
import { strangeFontFamily, normalFontFamily } from "../../../index.styles";


export const EventCardCon = styled(Card)`
    width: ${cardWidth}px;
    overflow: hidden;
    border-radius: 10px;
    &:hover {
        transform: scale(1.07);
    }
    .ant-card-body{
        padding: 6px;
    }
    .ant-card-head>.ant-card-head-wrapper>.ant-card-head-title{
        font-size: 30px;
        font-weight: bolder;
        padding: 10px 0;
        /* ${normalFontFamily} */
        ${strangeFontFamily}
    }
    .ant-card-cover{
        cursor: pointer;
    }
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
        line-height: 44px;
    }
    &>.ant-card-meta-detail{
        width: 100%;
        text-align: left;
    }
`


export const ContentRow = styled(Row)`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const ContentCol = styled(Col)`
`;
export const CardTextSpan = styled.span`
    padding-left: 15px;
    
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
