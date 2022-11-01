import styled from "styled-components";


import { 
    Col,
    Row,
} from 'antd';
const imgSrc = require('../../assets/home/cover.png');
export const HomeContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
`

export const BackgroundPicture= styled.picture`
`;
export const BackgroundImage = styled.img`
    src: ${imgSrc};
    width: 100%;
    height: 100%;
`;
export const BackgroundImageDiv = styled.div`
    width:100%;
    min-width: 1200px;
    height:500px;
    background-repeat: no-repeat;
    background-size: cover;
    /* background-image: url(${imgSrc}); */
`;
export const ListCol = styled(Col)`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 50px;
    position: relative;
    top:-100px;

    /* height: 100%; */
`
export const SearchCol = styled(Col)`
 
`
export const SearchRow = styled(Row)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;
    top:-200px;
`

export const ErrorH2 = styled.h2`
    
`;