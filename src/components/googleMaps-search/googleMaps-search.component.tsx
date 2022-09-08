
import React ,{ useState, FC}from "react";
import { useLoadScript } from '@react-google-maps/api';
import Places from "../places-auto-complete/places-auto-complete.component";
import GoogleMaps from '../googleMaps-map/googleMap-map.component'
import { markerCreator, googleMapLibType } from '../../utils/googleMap/googleMap.utils'
import { Spin } from "antd";
import { IPlaceInputValue } from "../places-auto-complete/places-auto-complete.component";
import { googleMapLibWithPlaces } from '../../utils/googleMap/googleMap.utils'
import { useCallback } from 'react';
import {
    GoogleMap
} from "@react-google-maps/api";
const comboboxSettings = {
    comboboxContainerStyle:{

    },
    ComboboxStyle:{

    },
    ComboboxInputStyle:{

    }
};

const mapContainerStyle = {
    width: '80%',
    height: '80%',
};

const options = {
    // mapId: "8e0a97af9386fef",
    disableDefaultUI: true,
    clickableIcons: false,
};


const googleMapSettings = {
    defaultCenter:{

    },
    googleMapProps:{
        zoom: 15,
        mapContainerStyle,
        options
    },
    markers: []
}

// interface IGoogleSearchInFormProps extends HTMLAttributes<HTMLDivElement>{
//     defaultV: LatLngLiteral;
//     onchange: (v: IPlaceInputValue) =>void
// } 
interface IGoogleSearchInFormProps {
    location: IPlaceInputValue;
    onChange: (v: IPlaceInputValue) =>void
}

const GoogleSearchInForm:FC<IGoogleSearchInFormProps> = ({onChange, location}) =>{
    const [ placeInput, setPlaceInput ] = useState<IPlaceInputValue>(location);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_PUBLISH_API_KEY!,
        libraries: googleMapLibWithPlaces,
    });
    // console.log(placeInput)
    const markerLocation = [markerCreator({position: placeInput.location})];
    // const {mapIsLoaded, addressFormInput, defaultLocation} = useContext(GoogleMapContext);

    const handlePlaceInputChange = (e: IPlaceInputValue) => {
        setPlaceInput(e);
        onChange(e);
    }

    if(!isLoaded) return <Spin />

    return (
        <div>
            <Places 
                {...comboboxSettings}
                defaultV = { placeInput}
                onChange = {handlePlaceInputChange}
            />
            <GoogleMaps 
                googleMapProps = {{center: placeInput.location ,...googleMapSettings.googleMapProps}}
                markers = {[...markerLocation, ...googleMapSettings.markers]}
                center = { placeInput }
            />
        </div>
    )
}

export default GoogleSearchInForm;