
import React ,{ useContext, HTMLAttributes, FC}from "react";
import Places from "../places-auto-complete/places-auto-complete.component";
import GoogleMaps from '../googleMaps-map/googleMap-map.component'
import { GoogleMapContext } from "../../context/google-map.context";
import { markerCreator } from '../../utils/googleMap/googleMap.utils'
import { Spin } from "antd";
import { LatLngLiteral } from "../../utils/interfaces/google.interface";
import { defaultLatLng } from "../../utils/googleMap/googleMap.utils";

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



// icon={{
//     path:
//       "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
//     fillColor: "yellow",
//     fillOpacity: 0.9,
//     scale: 2,
//     strokeColor: "gold",
//     strokeWeight: 2,
// }}
// animation = {google.maps.Animation.DROP}
// onClick = {markOnClick}
// position={latlng}
// onLoad = {markerOnload}


// interface IGoogleSearchInFormProps extends HTMLAttributes<HTMLDivElement>{
//     defaultLatLng: LatLngLiteral;
// }
const GoogleSearchInForm:FC = () =>{
    const {mapIsLoaded, addressFormInput, defaultLocation} = useContext(GoogleMapContext);
    
    if (!mapIsLoaded) return <Spin />;
    const center = addressFormInput? addressFormInput: defaultLocation;
    const markerLocation = addressFormInput? [markerCreator({position: center})]: [];
    return (
    <div>
        <Places {...comboboxSettings} />
        <GoogleMaps 
            googleMapProps = {{center: center,...googleMapSettings.googleMapProps}}
            markers = {[...markerLocation, ...googleMapSettings.markers]}
        />
    </div>
    );
}

export default GoogleSearchInForm;