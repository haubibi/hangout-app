import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import { ComboboxInputStyled, ComboboxStyled, ComboboxContainer } from './places-auto-complete.styles'
import React, { FC, useEffect,useState } from "react";
import { ILatLngAndAddress } from "../../interfaces/google.interface";

  export interface IComboboxContainer {
      width?: string;
      height?: string;
      left?: string;
      top?: string;
      maxWidth?:string;
      position?:string;
  }

  export interface IComboboxStyled extends IComboboxContainer{
    paddingTop?: string;
  }

  export interface IComboboxInputStyled extends IComboboxContainer{

  }

  // export interface IPlaceInputValue {
  //     location: LatLngLiteral;
  //     address: string;
  // }
  
  interface IPlacesProps {
    comboboxContainerStyle: IComboboxContainer;
    ComboboxStyle: IComboboxStyled;
    ComboboxInputStyle: IComboboxInputStyled;
    onChange: (e: ILatLngAndAddress) => void;
    defaultV: ILatLngAndAddress;
  }
  

  const Places:FC<IPlacesProps> = ({
    comboboxContainerStyle,
    ComboboxStyle,
    ComboboxInputStyle,
    defaultV,
    onChange
  }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
    // const [ ifAddressExist ] = useState<boolean>(defaultV.address?true:false)
    // const [latLng, setLatLng] = useState<LatLngLiteral>(defaultV.location);
    // const {setAddressFormInput, mapInstance, addressFormInput, addressString } = useContext(GoogleMapContext);

    useEffect(()=>{
        setValue(defaultV.address, false);
        clearSuggestions();
    },[clearSuggestions, setValue, defaultV.address]);


    const handleSelect = async (val: string) => {
      setValue(val, false);
      clearSuggestions();
      const results = await getGeocode({ address: val });
      const locationLatLng = await getLatLng(results[0]);
      if(!locationLatLng) return;
      onChange({
          latLng: locationLatLng,
          address: results[0].formatted_address
      });
      // mapInstance!.panTo(latlng);
    };
  
    return (
      <ComboboxContainer {...comboboxContainerStyle}>
        <ComboboxStyled onSelect={handleSelect} {...ComboboxStyle} >
        <ComboboxInputStyled
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="event place"
          {...ComboboxInputStyle}
        />
        <ComboboxPopover>
        <ComboboxList>
        {status === "OK" &&
        data.map(({ place_id, description }) => (
          <ComboboxOption key={place_id} value={description} />
          ))}
          </ComboboxList>
          </ComboboxPopover>
        </ComboboxStyled>
      </ComboboxContainer>
    );
}
      
      export default Places;