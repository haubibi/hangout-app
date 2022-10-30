import styled, { css } from "styled-components";
import { Layout } from 'antd';


const { Header, Footer, Content } = Layout;

export const gradient = css`
   background: linear-gradient(
    to left,
    rgba(7, 27, 82, 1) 0%,
    rgb(0, 128, 128) 100%
  );
`

export const AppLayoutContainer = styled.div`
   ${gradient}
   /* min-width: 1500px; */
   width: 100%;
   height: 100%;
   margin: 0;
   padding: 0;
`;
export const LayoutCon = styled(Layout)`
   ${gradient}
   width: 100%;
   height: auto;
   min-height: 100%;
   
   /* height: 100%; */
`;
export const HeaderCon = styled(Header)`

   /* margin: 20px 50px 20px 50px; */
   padding: 0;
   height: auto;
   background-color:#001529;
`;
export const ContentConBase = styled(Content)`
   ${gradient}
   min-height: 700px;
   height: auto;
   width: 100%;
   display: flex;
   flex-direction: column;
`;

export const ContentStartCon = styled(ContentConBase)`
   justify-content: flex-start;
   height: 100%;
`;
export const ContentCenterCon = styled(ContentConBase)`
   justify-content: center;
   height: 100%;
`;


export const FooterCon = styled(Footer)`
   border:3px solid #000;
   ${gradient}
   min-height: 100px;
`;
