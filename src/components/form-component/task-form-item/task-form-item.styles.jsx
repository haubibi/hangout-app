import styled, {css} from "styled-components";
import { 
    Input,
    Form , 
    InputNumber,
    DatePicker,
    TimePicker
} from 'antd';
// $ruler: 16px;
// $color-red: #AE1100;
// $color-bg: #EBECF0;
// $color-shadow: #BABECC;
// $color-white: #FFF;

export const ruler = 16;
export const colorShadow = '#BABECC';
export const colorWhite = '#FFF';




export const FlexStart = css`
    display: flex;
    width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
`;


export const TaskFormItemContainer = styled.div`
    width:100%;
    max-width: 800px;
    min-width: 400px;
    /* background-color: aliceblue; */
    display: flex;
    flex-direction: column;
`;


export const InputCon = styled(Input)`
    
`



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