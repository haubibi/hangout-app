import styled from "styled-components";
 import { 
    tagSpanPadding,
    tagConPadding,
    spanColumnGap
} from '../../../utils/default-settings/card.setting';
export const CardTagsCon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    column-gap: ${spanColumnGap}px;
    flex-wrap: nowrap;
    padding: ${tagConPadding}px;
    height: 43px;
    span {
        margin: 0px;
        padding: 0px ${tagSpanPadding}px 0px ${tagSpanPadding}px;
    }
    &:last-child{
        cursor: pointer;
    }
`

export const TagsPopover = styled.div`
`