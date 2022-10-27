

import styled from "styled-components";
import { Divider } from 'antd';
export const TaskTagsCon = styled.div`
    width: 100%;
    padding: 0px 30px 30px 30px;
`
export const TagsCon = styled.div`
    width: 100%;
    padding: 10px 0px 10px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    
`

export const TagWrap = styled.div`
    margin: 10px;
    span{
        font-size: 16px;
        font-weight: 500;
        font-style:italic;
    }
`

export const DividerCon = styled(Divider)`
    span{
        font-size: 20px;
        font-weight: 500;
        font-style:italic;
    }
`


