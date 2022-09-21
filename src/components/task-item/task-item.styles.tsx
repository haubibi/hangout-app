import styled from "styled-components";
import { strangeFontFamily } from "../../index.styles";
import { 
    Row,
    Col
 } from 'antd';


export const TaskitemContainer = styled.div`
    background-color: aquamarine;
    width: 100%;
    padding: 5%;
    min-width: 500px;
`

export const TitleCon = styled.h2`
    ${strangeFontFamily}
    font-size: 50px;
`
export const RowCon = styled(Row)`
`
export const BaseCol = styled(Col)`
   
`

export const CenterAlignCol = styled(BaseCol)`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const DescriptionCon = styled.h2`
    ${strangeFontFamily}
    font-size: 30px;
`
