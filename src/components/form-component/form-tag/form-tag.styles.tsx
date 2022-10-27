import styled from "styled-components";
import { Input, Tag } from 'antd';


export const TagCon = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    span{
        margin: 10px;
        height: 30px;
    }
`
export const InputCon = styled(Input)`
    width: auto;
    height: 30px;
    margin-right: 8px;
    vertical-align: top;
    margin: 10px;
`
export const TagItem = styled(Tag)`
`