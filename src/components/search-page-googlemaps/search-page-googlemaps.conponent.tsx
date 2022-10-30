import { useCallback, useMemo} from "react";
import {
    GoogleMap,
    MarkerF,
    Circle,
    GoogleMapProps
} from "@react-google-maps/api";
import React, { FC } from "react";

import { SearchPageGoogleMapCon } from './search-page-googlemaps.styles';
import { MapOptions } from "../../interfaces/google.interface";
import { IGoogleMarkerProps } from "../../interfaces/google.interface";
import { ILatLngAndAddress } from "../../interfaces/google.interface";
import { ITask } from '../../../functions/src/interfaces/task.interface';

interface IGoogleMapsProps{
    googleMapProps: GoogleMapProps;
    markers: IGoogleMarkerProps[];
    center: ILatLngAndAddress;
    onMarkerChange?: (task: ITask)=> void;
    searchCircle?: number;
}


const circleOption = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#0000ff",
    fillColor: "#0000ff",
}


 const SearchPageGoogleMaps:FC<IGoogleMapsProps> = ({
    googleMapProps,
    markers,
    center,
    onMarkerChange,
    searchCircle
}) => {
    // const mapRef = useRef<GoogleMap>();
    const options = useMemo<MapOptions>(
        () => (googleMapProps.options!),
        [googleMapProps.options]
    );
    const onLoad = useCallback((map: any) => {
        // map.panTo(center.location);
    }, []);

    const markerOnload = (marker:google.maps.Marker) => {
    }
    const markOnClick = (task:ITask) =>{
        onMarkerChange(task);
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
                markers.map((markProps,index)=><MarkerF key = {index} {...markProps} onClick = {(e:google.maps.MapMouseEvent) => {markOnClick(markProps.task)}} onLoad = {markerOnload} />)
            }
            
            {
                searchCircle &&
                <Circle center={center.latLng} radius={searchCircle} options={circleOption} />
            }
            </GoogleMap>
        </SearchPageGoogleMapCon>
    )
  };

  export default SearchPageGoogleMaps;