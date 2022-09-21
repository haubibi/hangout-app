
export type LatLngLiteral = google.maps.LatLngLiteral;
export type DirectionsResult = google.maps.DirectionsResult;
export type MapOptions = google.maps.MapOptions;
// eslint-disable-next-line max-len
export type googleMapLibType = ("places" | "drawing" | "geometry" | "localContext" | "visualization")[];

export const defaultLatLng = {
  lat: 51.4405956,
  lng: 5.4730085,
};
export const defaultAddress = "Victoriapark, Eindhoven, Netherlands";

export interface ILatLngAndAddress {
    latLng: LatLngLiteral;
    address: string;
}

