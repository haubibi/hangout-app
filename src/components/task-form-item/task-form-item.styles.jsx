import styled from "styled-components";
import {Form } from 'antd';

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