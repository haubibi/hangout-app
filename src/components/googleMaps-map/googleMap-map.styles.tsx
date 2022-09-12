import styled from "styled-components";

import { GoogleMap } from "@react-google-maps/api";

export const GoogleMapContainer = styled.div`
    width: 100%;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const GoogleMapItem = styled(GoogleMap)`
    width: 100%;
    height: 100%;
`