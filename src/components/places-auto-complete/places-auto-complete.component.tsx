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
  import { GoogleMapContext } from "../../context/google-map.context";
  import React, { useContext,HTMLAttributes, FC, useEffect } from "react";


  export interface IComboboxContainer {
      width?: string;
      height?: string;
      left?: string;
  }

  export interface IComboboxStyled extends IComboboxContainer{
    paddingTop?: string;
  }
  export interface IComboboxInputStyled extends IComboboxContainer{
  }

  interface IPlacesProps extends HTMLAttributes<HTMLDivElement>{
    comboboxContainerStyle: IComboboxContainer;
    ComboboxStyle: IComboboxStyled;
    ComboboxInputStyle: IComboboxInputStyled
  }
  

  const Places:FC<IPlacesProps> = ({
    comboboxContainerStyle,
    ComboboxStyle,
    ComboboxInputStyle
  }) => {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
    const {setAddressFormInput, mapInstance, addressFormInput, addressString } = useContext(GoogleMapContext);

    useEffect(()=>{
      setValue(addressString,false);
    },[]);



    const handleSelect = async (val: string) => {
      // console.log(val)
      setValue(val, false);
      clearSuggestions();
      const results = await getGeocode({ address: val });
      // const { lat, lng } = await getLatLng(results[0]);
      const latlng = await getLatLng(results[0]);

      setAddressFormInput(latlng);
      mapInstance!.panTo(latlng);
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