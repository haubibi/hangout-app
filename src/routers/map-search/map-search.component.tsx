
import { 
    MapSearchLayout,
    MapSearchContent,
    MapSearchSider,
    // PlacesCon,
    // SearchPageGoogleMapsCon,
    ContendDiv,
    SearchButton,
    RowMap,
    RowSearch,
    ColSearch,
    RowEventCard,
    ColEventCard,
    ColSearchButton
 } from './map-search.styles';
import { useLoadScript } from '@react-google-maps/api';
import { googleMapLibWithPlaces } from '../../utils/googleMap/googleMap.utils'
import { message, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Places from '../../components/places-auto-complete/places-auto-complete.component';
import SearchPageGoogleMaps from '../../components/search-page-googlemaps/search-page-googlemaps.conponent';
import { 
    useCallback,
    useEffect,
    useState,
    useMemo,
    useContext
} from 'react';
import { ILatLngAndAddress, LatLngLiteral } from '../../interfaces/google.interface';
import { getCurrentCoords, markerCreator, markersCreator } from '../../utils/googleMap/googleMap.utils';
import { IComboboxContainer } from '../../components/places-auto-complete/places-auto-complete.component';
import { FilterBar } from '../../components/filter-component/filter-bar/filter-bar.components';
import { 
    IFilterTasks,
    ParticipantsRange,
    DistanceRange
 } from '../../interfaces/task.interface';
import { useQuery } from '@apollo/client'; 
import { GETAllTASKS } from '../../utils/graphql/query.utils';
import { searchFilterValidator } from '../../validators/search-filter.valitator';
import { ITask } from '../../../functions/src/interfaces/task.interface';
import { EventCard } from '../../components/event-card-component/event-card/event-card.component';
import { NavigationContext, MenuKey } from '../../context/navigation.context';
import { getFilteredTasks } from '../../utils/task/task.filter';

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
    participantsRange: [1,50],
    distanceRange: [0,1]
}

export const checkIfTaskExist = (id: string, tasks: ITask[]):boolean => {
    const index = tasks.findIndex(task => task.id === id);
    return index === -1?false: true;
}


const MapSearch = () => {
    const [ currentLatLngAddress, setCurrentLatLngAddres ] = useState<ILatLngAndAddress | null>(null);
    const [ filterValue, setFilterValue ] = useState<IFilterTasks>(initFilterValue);
    const [ tasks, setTasks ] = useState<ITask[]>([]);
    const [ filteredTasks, setFilteredTasks ] = useState<ITask[]>([]);
    const [ clickedTask, setClickedTask ] = useState<ITask>(null);
    const [ submitClick, setSubmitClick ] = useState<boolean>(false);
    const { data, loading, error} = useQuery(GETAllTASKS);
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_PUBLISH_API_KEY!,
        libraries: googleMapLibWithPlaces,
    });
    // const {data, error, loading} = useQuery(GETFILTEREDTASKS,{
    //     variables: {
    //         currentLatLng: (currentLatLngAddress && currentLatLngAddress.latLng),
    //         taskFilter: filterValue
    //     }
    // });

    console.log(filterValue)
    console.log("currentLatLngAddress: ", currentLatLngAddress && currentLatLngAddress.latLng)
    console.log('data:',data)
    console.log('error:',error)
    console.log('loading:',loading)


    //set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.SEARCHONMAP);
    },[setCurrentMenuKey])
   
    //get current location
    useEffect(()=>{
        const getLatLng = async() => {
            await getCurrentCoords().then((latLng)=>{
                setCurrentLatLngAddres({
                    latLng,
                    address: ''
                });
                setSubmitClick(true);
            });
        }
        getLatLng();
    },[setCurrentLatLngAddres]);

    //get all the tasks
    useEffect(()=>{
        if(data && data.tasks) {
            setTasks(data.tasks);
        }
    },[data])

    //get filtered tasks
    useEffect(()=>{
       if(tasks && currentLatLngAddress?.latLng && filterValue && submitClick) {
            const filteredTasks = getFilteredTasks(
                currentLatLngAddress.latLng,
                filterValue,
                tasks
            );

            setFilteredTasks(filteredTasks);
       }
    },[tasks, currentLatLngAddress, filterValue, submitClick])

    //set clicked task
    useEffect(()=>{
        if(filteredTasks && clickedTask){
            const taskExist = checkIfTaskExist(clickedTask.id, filteredTasks);
            if(!taskExist) setClickedTask(null);
        } else {
            setClickedTask(null);
        }
    },[clickedTask, filteredTasks])

    // //get filtered tasks
    // useEffect(() =>{
    //     if(data && data.tasks && submitClick) {
    //         if(clickedTask) {
    //             const taskExist = checkIfTaskExist(clickedTask.id, data.getFilteredTasks);
    //             if(!taskExist) setClickedTask(null);
    //         }
    //         setFilteredTasks(data.getFilteredTasks);
    //         setSubmitClick(false);
    //     }
    //     console.log(data)
    // },[data, setFilteredTasks, submitClick, setSubmitClick, clickedTask]);





    const taskMarkers = useMemo(()=>{
        const props = filteredTasks.map((filterTask)=>{
            return {task:filterTask, position: filterTask.latLngAndAddress.latLng}
        })
        return markersCreator(props);
    },[filteredTasks])


    //filter bar get the filter object   
    const filterBarOnChange = useCallback((value: IFilterTasks)=>{
        //viladate
        setFilterValue(value);
        setSubmitClick(true);
    },[]);

 
    const handlePlaceInputChange = useCallback((e: ILatLngAndAddress):void => {
        setCurrentLatLngAddres(e);
        setSubmitClick(true);
        console.log('place:' , e);
    },[setCurrentLatLngAddres]);


    const onMarkerChangeHandle = useCallback((task: ITask):void => {
        setClickedTask(task);
    },[setClickedTask]);

    const searchOnClick = useCallback(():void => {
        setSubmitClick(true);
    },[]);




    if(!currentLatLngAddress || !isLoaded) return <Spin />;
    
    // const markerLocation = [markerCreator({position: currentLatLngAddress.latLng})];
    return (
        <MapSearchLayout>
            <MapSearchSider
                collapsible
                collapsedWidth={0}
                width = {300}
                theme = "dark"
            >
                <FilterBar 
                    value = {filterValue}
                    onChange = {filterBarOnChange}
                />    
            </MapSearchSider>
            <MapSearchContent>
                <ContendDiv>
                    <SearchPageGoogleMaps 
                        googleMapProps = {{center: currentLatLngAddress.latLng ,...googleMapSettings.googleMapProps}}
                        markers = {[...taskMarkers, ...googleMapSettings.markers]}
                        center = { currentLatLngAddress }
                        onMarkerChange = {onMarkerChangeHandle}
                        searchCircle = {filterValue.distanceRange?filterValue.distanceRange[1]*1000:null}
                    />
                    <RowSearch align = "middle" justify='center'>
                        <ColSearch xs = {20} sm = {20} md = {18} lg = {16} xl = {14}>
                            <Places 
                                {...comboboxSettings}
                                defaultV = { currentLatLngAddress}
                                onChange = {handlePlaceInputChange}
                            />
                            {/* <SearchButton type="primary" icon={<SearchOutlined />} onClick = {searchOnClick}>
                                
                            </SearchButton> */}

                        </ColSearch>
                        <ColSearchButton>
                        </ColSearchButton>
                    </RowSearch>
                    {

                        clickedTask && 
                        <RowEventCard>
                            <ColEventCard>
                                <EventCard task = {clickedTask}/>
                            </ColEventCard>
                        </RowEventCard>
                    }
                </ContendDiv>
            </MapSearchContent>
        </MapSearchLayout>
    )
}

export default MapSearch;