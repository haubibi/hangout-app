import styled from "styled-components";
import { Layout } from 'antd';
import { gradient } from "../appLayout/appLayout.styles";
const { Sider, Content } = Layout;
export const MyAccountPageCon = styled(Layout)`
    height:100%;
`
export const MyAccountPageSideCon = styled(Sider)`

`
export const MyAccountPageContentCon = styled(Content)`
    /* ${gradient} */
    background-color:  rgb(76, 182, 182);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 1100px;
`

export const MenuCon = styled.div`
    width:300px;
    height:100%;
`;