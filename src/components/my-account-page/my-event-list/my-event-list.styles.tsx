import styled from "styled-components";
import { List } from 'antd';
import { FlexDisplayRowStart } from "../../../App.styles";
import { cardColGap,cardRowGap,cardWidth } from "../../../utils/default-settings/card.setting";

export const ListCon = styled(List)`
    width: 100%;
    min-width: 900px;
    max-width: 2000px;
    .ant-spin-nested-loading .ant-spin-container .ant-row {
        ${FlexDisplayRowStart}
        column-gap: ${cardColGap}px;
        row-gap: ${cardRowGap}px;
        &>div{
            min-width: ${cardWidth}px !important;
        }
    }
`

export const ContainerDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: center !important;
    .ant-pagination{
        margin-top:50px;
    }
`