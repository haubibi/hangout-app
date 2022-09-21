import { useCallback, useMemo} from "react";
import {
    GoogleMap,
    MarkerF,
    GoogleMapProps
} from "@react-google-maps/api";
import React, { FC } from "react";

import { GoogleMapContainer } from './googleMap-map.styles';
import './googleMap-map.styles'
import { MapOptions } from "../../interfaces/google.interface";
import { IGoogleMarkerProps } from "../../interfaces/google.interface";
import { ILatLngAndAddress } from "../../interfaces/google.interface";

interface IGoogleMapsProps{
    googleMapProps: GoogleMapProps;
    markers: IGoogleMarkerProps[];
    center: ILatLngAndAddress;
}


 const GoogleMaps:FC<IGoogleMapsProps> = ({
    googleMapProps,
    markers,
    center
}) => {
    const options = useMemo<MapOptions>(
        () => (googleMapProps.options!),
        []
    );
    const onLoad = useCallback((map: any) => {
    }, []);

    const markerOnload = (marker:google.maps.Marker) => {
    }
    const markOnClick = () =>{ 
    }
    return (
        <GoogleMapContainer>
            {/* <ReactComponent /> */}
            <GoogleMap
                {...googleMapProps}
                onLoad={onLoad}
                options = {options}
                center = {center.latLng}
            >
            
            {
                markers.map((markProps,index)=><MarkerF key = {index} {...markProps} onClick = {markOnClick} onLoad = {markerOnload} />)
            }
            
            </GoogleMap>
        </GoogleMapContainer>
    )
  };

  export default GoogleMaps;