import { useState, Dispatch, useEffect,createContext, FC } from "react";
import { getCurrentCoords } from "../utils/googleMap/googleMap.utils";
import { LatLngLiteral } from "../interfaces/google.interface";
import React from 'react';

// google.maps.Map
interface IMapFormInput {
  defaultLocation: LatLngLiteral;
  setDefaultLocation: Dispatch<React.SetStateAction<LatLngLiteral>>;
  mapIsLoaded: boolean;
  setMapIsLoaded:Dispatch<React.SetStateAction<boolean>>;
  addressFormInput: LatLngLiteral | null,
  setAddressFormInput:Dispatch<React.SetStateAction<LatLngLiteral | null>>;
  mapInstance: google.maps.Map | null;
  setMapInstance:Dispatch<React.SetStateAction<google.maps.Map| null>>;
  addressString: string;
  setAddressString: Dispatch<React.SetStateAction<string>>;
}

const defaultL:LatLngLiteral = {
    lat: 0,
    lng: 0
}

const initialFormInputMapValue: IMapFormInput ={
  defaultLocation: defaultL,
  mapIsLoaded: false,
  addressFormInput: null,
  mapInstance: null,
  addressString: '',
  setMapIsLoaded:()=>{},
  setDefaultLocation:()=>{},
  setAddressFormInput: ()=>{},
  setMapInstance: ()=>{},
  setAddressString: ()=>{}
}

export const GoogleMapContext = createContext(initialFormInputMapValue);

export interface IProviderChildrenProps {
    children: JSX.Element[] | JSX.Element
}

export const GoogleMapProvider:FC<IProviderChildrenProps> = ({children}) =>{
    const [mapIsLoaded, setMapIsLoaded] =useState<boolean>(false);
    const [defaultLocation, setDefaultLocation] =useState<LatLngLiteral>(defaultL);
    const [addressFormInput, setAddressFormInput] = useState<null | LatLngLiteral>(null);
    const [addressString, setAddressString] = useState<string>('');
    const [mapInstance, setMapInstance] =useState<null | google.maps.Map>(null);

    useEffect(()=>{
      const getCurrentCoordsAsync = async()=>{
          await getCurrentCoords().then((coor)=>{
              setDefaultLocation(coor!);
              // setCurrentCoords(coor!);
          })
          .catch((error)=>{
              console.log(error);
          });
      }
      getCurrentCoordsAsync();
    },[]);
    const value = {
      defaultLocation,
      mapIsLoaded,
      mapInstance,
      addressFormInput,
      addressString,
      setAddressFormInput,
      setDefaultLocation,
      setMapInstance,
      setMapIsLoaded,
      setAddressString
    };
    return <GoogleMapContext.Provider value = {value}>{children}</GoogleMapContext.Provider>
}
