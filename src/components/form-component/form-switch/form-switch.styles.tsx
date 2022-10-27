import styled from "styled-components";
import { Switch, Form } from "antd";
export const SwitchCon = styled(Switch)`
    
`
export const FormItemCon= styled(Form.Item)`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 50px;
    padding:5px;
    & .ant-form-item-label,.ant-form-item-control{
        padding: 20px !important;
        height: 30px !important;
    }
`