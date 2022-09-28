import styled from "styled-components";
import Places from '../../components/places-auto-complete/places-auto-complete.component';
import SearchPageGoogleMaps from '../../components/search-page-googlemaps/search-page-googlemaps.conponent';
import {
    Col,
    Row,
    Layout,
    Button
 } from "antd";
const {Content, Sider} = Layout;
export const MapSearchLayout = styled(Layout)`
    width: 100%;
    height: 100vh;
   
    /* height: 100%; */
`
export const MapSearchContent = styled(Content)`

`


export const MapSearchSider = styled(Sider)`
    background-color: #4bb3cc;
    min-width: 300px !important;
`


export const ContendDiv = styled.div`
    height: 100vh;
    position: relative;

    /* .kQCMba{
        position: absolute;
        top: 50px;
    } */
`
// export const PlacesCon = styled(Places)`
//     z-index: 2;
// `
// export const SearchPageGoogleMapsCon = styled(SearchPageGoogleMaps)`
//     z-index: 1;
// `

export const RowMap = styled(Row)`
     height: 100vh;
`;
export const RowSearch = styled(Row)`
    width: 100%;
    height: 30px;
    position: absolute;
    top: 100px;
`;
export const ColSearch = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const ColSearchButton = styled(Col)`
    
`;
export const SearchButton = styled(Button)`
    
`;

export const RowEventCard = styled(Row)`
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 500px;
    left:40%;
`;
export const ColEventCard = styled(Col)`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;
