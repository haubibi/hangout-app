import { useCallback, useMemo, useRef, useState } from "react";
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

const containerStyle = {
    width: '80%',
    height: '80%',
};

interface GoogleMapsInterface extends HTMLAttributes<HTMLDivElement>{
    defaultCenter: LatLngLiteral,
    googleMapProps: GoogleMapProps,
    markers: IGoogleMarkerProps[];
}


 const GoogleMaps:FC<GoogleMapsInterface> = ({
    defaultCenter,
    googleMapProps,
    markers
 }) => {
    // const mapRef = useRef<any>();
    const { addressFormInput, setMapInstance, defaultLocation } = useContext(GoogleMapContext);
    const center = useMemo<LatLngLiteral>(
        () => defaultCenter,
        []
    );
    const options = useMemo<MapOptions>(
        () => (googleMapProps.options!),
        []
    );
    const onLoad = useCallback((map:any) => {
        setMapInstance(map);
    }, []);

  const markerOnload = (marker:google.maps.Marker) => {
    console.log(marker, center)
  }
  const markOnClick = () =>{
    
  }
    return (
        <GoogleMapContainer>
            {/* <ReactComponent /> */}
            <GoogleMap
                options={options}
                onLoad={onLoad}
                {...googleMapProps}
            >
            
            {
                markers.map((markProps,index)=><MarkerF key = {index} {...markProps} onClick = {markOnClick} onLoad = {markerOnload} />)
            }
            
            </GoogleMap>
        </GoogleMapContainer>
    )
  };

  export default GoogleMaps;