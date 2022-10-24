import {
    FC
} from 'react';

import {
    TaskMapCon,
    DividerCon
} from './task-map.styles';
import GoogleMaps from '../../googleMaps-map/googleMap-map.component';
import { ILatLngAndAddress } from '../../../interfaces/google.interface';
import { markerCreator } from '../../../utils/googleMap/googleMap.utils';

const mapContainerStyle = {
    width: '100%',
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
export interface ITaskMapConProps {
    address: ILatLngAndAddress;
}

export const TaskMap: FC<ITaskMapConProps> = ({
    address
}) =>{
    const markerLocation = [markerCreator({position: address.latLng})];
    return (
        <TaskMapCon>
            <DividerCon orientation="left">Check on map</DividerCon>
             <GoogleMaps 
                 googleMapProps = {{center: address.latLng ,...googleMapSettings.googleMapProps}}
                 markers = {[...markerLocation, ...googleMapSettings.markers]}
                 center = { address }
             />
        </TaskMapCon>
    )
}