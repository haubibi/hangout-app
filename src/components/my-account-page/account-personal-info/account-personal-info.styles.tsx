import styled from "styled-components";
import {
    Col,
    Row,
    Form,
    Input,
    Radio,
    Button
} from 'antd';


const {TextArea} = Input;

export const AccountPersonalInfoCon = styled.div`
    width: 650px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    
`;


export const ColInfoCon = styled(Col)`
    
`;
export const RowInfoCon = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
export const FormCon = styled(Form)`
    background-color: rgba(255,255,255,0.4);
    background-attachment: fixed;
    width:100%;
    width: 650px;
    padding: 50px;
    border-radius: 30px;
`;

export const FormDisplayNameItem = styled(Form.Item)`
    
`
export const FormDisplayNameInput = styled(Input)`
    
`
export const FormSexItem = styled(Form.Item)`
    
`
export const FormSexRadioGroup = styled(Radio.Group)`
    & {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
`
export const FormSubmitButtonItem = styled(Form.Item)`
    
`
export const FormSubmitButton = styled(Button)`
    
`
export const FormDescriptionTextArea = styled(Form.Item)`
    
`
export const DescriptionTextItem = styled(TextArea)`
    
`