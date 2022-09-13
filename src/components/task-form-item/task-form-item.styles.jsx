import styled, {css} from "styled-components";
import { 
    Form , 
    InputNumber,
    DatePicker,
    TimePicker
} from 'antd';

export const FlexStart = css`
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;


export const TaskFormItemContainer = styled.div`
    padding: 5%;
    width:100%;
    max-width: 800px;
    min-width: 400px;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
`;

export const FormContainer = styled(Form)`
    width: auto;
    display: flex;
    flex-direction: column;
`
export const InputNumberCon = styled(InputNumber)`
    ${FlexStart}
`;
export const DatePickerCon = styled(DatePicker)`
    ${FlexStart}
`;
export const TimePickerCon = styled(TimePicker)`
    ${FlexStart}
`;