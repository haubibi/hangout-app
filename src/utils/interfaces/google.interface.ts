import { MarkerProps } from "@react-google-maps/api";
export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;

export interface ILatLngAndAddress {
    latLng: LatLngLiteral;
    address: string;
}
export interface IGoogleMarkerProps extends MarkerProps{

}



