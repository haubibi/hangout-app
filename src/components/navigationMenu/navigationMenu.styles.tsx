import styled from "styled-components";
import { Menu } from "antd";
const navigateHeight = 70;
export const MenuCon = styled(Menu)`
    display: flex;
    justify-content:flex-end;
    height: ${navigateHeight}px;
    .ant-menu-item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    & li:nth-child(1){
        position: absolute;
        left: 0%;
        height: ${navigateHeight}px;
    }

`