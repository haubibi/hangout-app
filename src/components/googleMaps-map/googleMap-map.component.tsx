import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { ReactComponent } from '../../assets/svgIcon/panda-face.svg'
import {
    GoogleMap,
    MarkerF,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
    GoogleMapProps
} from "@react-google-maps/api";
import React, { HTMLAttributes, FC } from "react";

import { GoogleMapContainer } from './googleMap-map.styles';
import './googleMap-map.styles'
import { LatLngLiteral, MapOptions } from "../../utils/interfaces/google.interface";
import { GoogleMapContext } from "../../context/google-map.context";
import { useContext } from "react";
import { IGoogleMarkerProps } from "../../utils/interfaces/google.interface";
import { IPlaceInputValue } from '../places-auto-complete/places-auto-complete.component';

interface IGoogleMapsProps{
    googleMapProps: GoogleMapProps;
    markers: IGoogleMarkerProps[];
    center: IPlaceInputValue;
}


 const GoogleMaps:FC<IGoogleMapsProps> = ({
    googleMapProps,
    markers,
    center
}) => {
    // const mapRef = useRef<GoogleMap>();
    // if(mapRef.current) {
    //     mapRef.current.panTo(center.location);
    // }
   
    // const mapRef = useRef<any>();
    // const { setMapInstance } = useContext(GoogleMapContext);
    const options = useMemo<MapOptions>(
        () => (googleMapProps.options!),
        []
    );
    const onLoad = useCallback((map: any) => {
        // map.panTo(center.location);
    }, []);

    const markerOnload = (marker:google.maps.Marker) => {
        // console.log(marker, center)
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
                center = {center.location}
            >
            
            {
                markers.map((markProps,index)=><MarkerF key = {index} {...markProps} onClick = {markOnClick} onLoad = {markerOnload} />)
            }
            
            </GoogleMap>
        </GoogleMapContainer>
    )
  };

  export default GoogleMaps;