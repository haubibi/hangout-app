import {IGoogleMarkerProps} from '../interfaces/google.interface';
import Geocode from 'react-geocode';
type LatLngLiteral = google.maps.LatLngLiteral;
export const getCurrentCoords= async ():Promise<LatLngLiteral | null> => {
    return new Promise((resolve,reject)=>{
        navigator.geolocation.getCurrentPosition((posiiton: GeolocationPosition)=>{
            const coords: LatLngLiteral = {
                lat: posiiton.coords.latitude,
                lng: posiiton.coords.longitude
            }; 
            resolve(coords);
        },
        reject
        );
    });
}


export const markerCreator = (props: IGoogleMarkerProps) =>{
    const icon = props.icon || {
        path:
          "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
        fillColor: "yellow",
        fillOpacity: 0.9,
        scale: 2,
        strokeColor: "gold",
        strokeWeight: 2,
    };
    const animation = props.animation || google.maps.Animation.DROP;
    return {
        icon,
        animation,
        ...props
    }
};


export const getLocationByLatlng = async(latlng: LatLngLiteral) => {
   return await Geocode.fromLatLng(latlng.lat.toString(), latlng.lng.toString()).then(
        (response) => {
            return response.results[0].formatted_address;
        },
        (error) => {
            return error;
        }
    );
}
