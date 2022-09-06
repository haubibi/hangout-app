import {IGoogleMarkerProps} from '../interfaces/google.interface';
import { LatLngLiteral } from '../interfaces/google.interface'
import Geocode from 'react-geocode';


export const defaultLatLng = {
    lat:51.4405956,
    lng: 5.4730085
}

    //  useEffect(()=> {
    //     const getLocation = async() => {
    //         await getLocationByLatlng(markerLocation).then((lct:string)=>{
    //             setInputLocation(lct!);
    //         }).catch(error=> {
    //             console.log(error)
    //         });
    //     };
    //     getLocation();
    // });
export const defaultAddress = 'Victoriapark, Eindhoven, Netherlands';

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

// Geocode.setApiKey("AIzaSyB0TA9D7pUqSlKckqwbh4BXNNi2MS---Hc");
export const getLocationByLatlng = async(latlng: LatLngLiteral):Promise<string | undefined> => {
    console.log(latlng)
    return new Promise((resolve,reject)=>{
        Geocode.fromLatLng(latlng.lat.toString(), latlng.lng.toString()).then(
            (response) => {
                resolve(response.results[0].formatted_address);
            },
            (error) => {
                console.log(latlng)
                reject(error);
            }
        );
    });
    
}
