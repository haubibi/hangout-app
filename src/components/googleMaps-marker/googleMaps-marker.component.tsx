import { MarkerF } from "@react-google-maps/api";
import React, { FC } from 'react';
import { IGoogleMarkerProps } from "../../utils/interfaces/google.interface";


const GoogleMapsMarker:FC<IGoogleMarkerProps> = ({...googleMarkerProps}) => {
    return (
        <MarkerF {...googleMarkerProps}>

        </MarkerF>
    )
}

export default GoogleMapsMarker;