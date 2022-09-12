
import React ,{ useState, FC}from "react";
import { useLoadScript } from '@react-google-maps/api';
import Places from "../places-auto-complete/places-auto-complete.component";
import GoogleMaps from '../googleMaps-map/googleMap-map.component'
import { markerCreator } from '../../utils/googleMap/googleMap.utils'
import { Spin } from "antd";
import { googleMapLibWithPlaces } from '../../utils/googleMap/googleMap.utils'
import { ILatLngAndAddress } from "../../utils/interfaces/google.interface";

const comboboxSettings = {
    comboboxContainerStyle:{

    },
    ComboboxStyle:{

    },
    ComboboxInputStyle:{

    }
};

const mapContainerStyle = {
    width: '90%',
    height: '100%',
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
// latLngAndAddress
interface IGoogleSearchInFormProps {
    value?: ILatLngAndAddress;
    onChange?: (v: ILatLngAndAddress) =>void
}

const GoogleSearchInForm:FC<IGoogleSearchInFormProps> = ({onChange, value}) =>{
    const [ placeInput, setPlaceInput ] = useState<ILatLngAndAddress | undefined>(value);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_PUBLISH_API_KEY!,
        libraries: googleMapLibWithPlaces,
    });
    const markerLocation = [markerCreator({position: placeInput!.latLng})];
    // const {mapIsLoaded, addressFormInput, defaultLocation} = useContext(GoogleMapContext);

    const handlePlaceInputChange = (e: ILatLngAndAddress) => {
        setPlaceInput(e);
        onChange!(e);
    }

    if(!isLoaded) return <Spin />

    return (
        <div>
            <Places 
                {...comboboxSettings}
                defaultV = { placeInput!}
                onChange = {handlePlaceInputChange}
            />
            <GoogleMaps 
                googleMapProps = {{center: placeInput!.latLng ,...googleMapSettings.googleMapProps}}
                markers = {[...markerLocation, ...googleMapSettings.markers]}
                center = { placeInput! }
            />
        </div>
    )
}

export default GoogleSearchInForm;