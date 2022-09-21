import { useCallback, useMemo} from "react";
import { ReactComponent } from '../../assets/svgIcon/panda-face.svg'
import {
    GoogleMap,
    MarkerF,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
    GoogleMapProps
} from "@react-google-maps/api";
import React, { FC } from "react";

import { 
    SearchPageGoogleMapCon,
    PlacesCon
 } from './search-page-googlemaps.styles';
import { MapOptions } from "../../interfaces/google.interface";
import { GoogleMapContext } from "../../context/google-map.context";
import { useContext } from "react";
import { IGoogleMarkerProps } from "../../interfaces/google.interface";
import { ILatLngAndAddress } from "../../interfaces/google.interface";

interface IGoogleMapsProps{
    googleMapProps: GoogleMapProps;
    markers: IGoogleMarkerProps[];
    center: ILatLngAndAddress;
}


 const SearchPageGoogleMaps:FC<IGoogleMapsProps> = ({
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
        console.log(marker, center)
    }
    const markOnClick = (e:google.maps.MapMouseEvent) =>{
        console.log(e)
    
    }
    return (
        <SearchPageGoogleMapCon>
            <GoogleMap
                {...googleMapProps}
                onLoad={onLoad}
                options = {options}
                center = {center.latLng}
            >
            {
                markers.map((markProps,index)=><MarkerF  key = {index} {...markProps} onClick = {markOnClick} onLoad = {markerOnload} />)
            }
            
            </GoogleMap>
        </SearchPageGoogleMapCon>
    )
  };

  export default SearchPageGoogleMaps;