
import { 
    MapSearchLayout,
    MapSearchContent,
    MapSearchSider,
    // PlacesCon,
    // SearchPageGoogleMapsCon,
    ContendDiv,
    RowMap,
    RowSearch,
    SearchCol
 } from './map-search.styles';
import { useLoadScript } from '@react-google-maps/api';
import { googleMapLibWithPlaces } from '../../utils/googleMap/googleMap.utils'
import { message, Spin } from 'antd';
import Places from '../../components/places-auto-complete/places-auto-complete.component';
import SearchPageGoogleMaps from '../../components/search-page-googlemaps/search-page-googlemaps.conponent';
import { useCallback, useEffect, useState } from 'react';
import { ILatLngAndAddress, LatLngLiteral } from '../../interfaces/google.interface';
import { getCurrentCoords, markerCreator } from '../../utils/googleMap/googleMap.utils';
import { IComboboxContainer } from '../../components/places-auto-complete/places-auto-complete.component';
import { FilterBar } from '../../components/filter-bar/filter-bar.components';
import { 
    IFilterTasks,
    ParticipantsRange,
    DistanceRange
 } from '../../interfaces/task.interface';
import { searchFilterValidator } from '../../validators/search-filter.valitator';

const comboboxSettings = {
    comboboxContainerStyle:{
        left: "0px",
        top: "0px",
        maxWidth: "1000px"
    },
    ComboboxStyle:{

    },
    ComboboxInputStyle:{
        width: '100%'
    }
};

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

//filter bar
const initFilterValue: IFilterTasks = {
    participantsRange: [1,5],
    distanceRange: [0,5]
}


const MapSearch = () => {
    const [currentLatLngAddress, setCurrentLatLngAddres] = useState<ILatLngAndAddress | null>(null);
    const [filterValue, setFilterValue] = useState<IFilterTasks>(initFilterValue);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_PUBLISH_API_KEY!,
        libraries: googleMapLibWithPlaces,
    });
    useEffect(()=>{
        const getLatLng = async() => {
            await getCurrentCoords().then((latLng)=>{
                setCurrentLatLngAddres({
                    latLng,
                    address: ''
                });
            });
        }
        getLatLng();
    },[setCurrentLatLngAddres]);


    //filter bar
    
    const filterBarOnChange = useCallback((value: IFilterTasks)=>{
        //viladate
        setFilterValue(value);
        console.log(value)
    },[]);

 
    const handlePlaceInputChange = useCallback((e: ILatLngAndAddress):void => {
        setCurrentLatLngAddres(e);
    },[setCurrentLatLngAddres]);




    if(!currentLatLngAddress || !isLoaded) return <Spin />;
    
    const markerLocation = [markerCreator({position: currentLatLngAddress.latLng})];
    return (
        <MapSearchLayout>
            <MapSearchSider>
                <FilterBar 
                    value = {filterValue}
                    onChange = {filterBarOnChange}
                />    
            </MapSearchSider>
            <MapSearchContent>
                <ContendDiv>
                    <SearchPageGoogleMaps 
                        googleMapProps = {{center: currentLatLngAddress.latLng ,...googleMapSettings.googleMapProps}}
                        markers = {[...markerLocation, ...googleMapSettings.markers]}
                        center = { currentLatLngAddress }
                    />
                    <RowSearch align = "middle" justify='center'>
                        <SearchCol xs = {20} sm = {20} md = {18} lg = {16} xl = {14}>
                            <Places 
                                {...comboboxSettings}
                                defaultV = { currentLatLngAddress}
                                onChange = {handlePlaceInputChange}
                            />
                        </SearchCol>
                    </RowSearch>
                </ContendDiv>
            </MapSearchContent>
        </MapSearchLayout>
    )
}

export default MapSearch;