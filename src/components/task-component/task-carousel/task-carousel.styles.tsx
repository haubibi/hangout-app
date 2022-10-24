import styled from "styled-components";
import {
    carouselImgWidth,
    carouselImgHeight
} from '../../../utils/default-settings/event.settings';
export const TaskCarouselCon = styled.div`
    width: ${carouselImgWidth}px;
    height: ${carouselImgHeight}px;
`
export const ImageCon = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
`