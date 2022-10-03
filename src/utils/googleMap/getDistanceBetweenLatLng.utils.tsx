
import {LatLngLiteral} from "../../interfaces/google.interface";

/**
 * Converts degrees to radians.
 *
 * @param degrees Number of degrees.
 */
export const degreesToRadians = (degrees:number):number => degrees * Math.PI / 180;


/**
 * Returns the distance between 2 points of coordinates in Google Maps
 *
 * @see https://stackoverflow.com/a/1502821/4241030
 * @param latLng1 Latitude, Longitude of the point A
 * @param latLng2 Latitude, Longitude of the point B
 * return distance Km
 */
export const getDistanceBetweenPoints = (
    latLng1: LatLngLiteral,
    latLng2: LatLngLiteral,
): number =>{
  const lat1 = latLng1.lat;
  const lng1 = latLng1.lng;
  const lat2 = latLng2.lat;
  const lng2 = latLng2.lng;
  // The radius of the planet earth in meters
  const R = 6378137;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLong = degreesToRadians(lng2 - lng1);
  const a = Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
            Math.cos(degreesToRadians(lat1)) *
            Math.cos(degreesToRadians(lat1)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance / 1000;
};
