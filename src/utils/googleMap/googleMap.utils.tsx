import { 
    IGoogleMarkerProps,
    googleMapLibType,
    LatLngLiteral
} from '../../interfaces/google.interface';
import Geocode from 'react-geocode';


export const defaultLatLng = {
    lat: 51.4405956,
    lng: 5.4730085
}

export const googleMapLibWithPlaces:googleMapLibType = ['places'];



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



// Geocode.setApiKey("AIzaSyB0TA9D7pUqSlKckqwbh4BXNNi2MS---Hc");
export const getLocationByLatlng = async(latlng: LatLngLiteral):Promise<string | undefined> => {
    // console.log(latlng)
    return new Promise((resolve,reject)=>{
        Geocode.fromLatLng(latlng.lat.toString(), latlng.lng.toString()).then(
            (response) => {
                resolve(response.results[0].formatted_address);
            },
            (error) => {
                // console.log(latlng)
                reject(error);
            }
        );
    });
    
}


export const mapStarIcon = {
    path:
      "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
    fillColor: "yellow",
    fillOpacity: 0.9,
    scale: 2,
    strokeColor: "gold",
    strokeWeight: 2,
    anchor: {x: 10, y:15}
};



export const markerCreator = (props: IGoogleMarkerProps):IGoogleMarkerProps =>{
    const icon = (props.icon || mapStarIcon) as IGoogleMarkerProps["icon"];
    return {
        icon,
        // animation,
        ...props
    }
};

export const markersCreator = (markersProps: IGoogleMarkerProps[]):IGoogleMarkerProps[] =>{
    return markersProps.map((markerProps) => markerCreator(markerProps));
}
