
import { 
    MapSearchLayout,
    MapSearchContent,
    MapSearchSider,
    ContendDiv,
    RowSearch,
    ColSearch,
    RowEventCard,
    ColEventCard,
    ColSearchButton
 } from './map-search.styles';
import { useLoadScript } from '@react-google-maps/api';
import { googleMapLibWithPlaces } from '../../utils/googleMap/googleMap.utils'
import { Spin } from 'antd';

import Places from '../../components/places-auto-complete/places-auto-complete.component';
import SearchPageGoogleMaps from '../../components/search-page-googlemaps/search-page-googlemaps.conponent';
import { 
    useCallback,
    useEffect,
    useState,
    useMemo,
    useContext
} from 'react';
import { ILatLngAndAddress } from '../../interfaces/google.interface';
import { getCurrentCoords, markersCreator } from '../../utils/googleMap/googleMap.utils';
import { FilterBar } from '../../components/filter-component/filter-bar/filter-bar.components';
import { 
    IFilterTasks
 } from '../../interfaces/task.interface';
import { TasksContext } from '../../context/tasks.context';
import { ITask } from '../../interfaces/task.interface';
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
    distanceRange: [0,1],
    dateRange: [null, null],
    category: 'any'
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
    const { allTasks, refetchAllTasks} = useContext(TasksContext);
    // const { data, loading, error} = useQuery(GET_All_TASKS);
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_PUBLISH_API_KEY!,
        libraries: googleMapLibWithPlaces,
    });


    // console.log(filterValue)
    // console.log("currentLatLngAddress: ", currentLatLngAddress && currentLatLngAddress.latLng)
    // console.log('allTasks:',allTasks)
    // console.log('error:',fetchAllTasksError)
    // console.log('loading:',fetchAllTasksLoading)


    //set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.SEARCHONMAP);
    },[setCurrentMenuKey])
   

    //refetch all the tasks every time
    useEffect(()=> {
        refetchAllTasks();
    },[refetchAllTasks]);


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
        if(allTasks) {
            setTasks(allTasks);
        }
    },[allTasks])

    //get filtered tasks
    useEffect(()=>{
       if(tasks && currentLatLngAddress?.latLng && filterValue && submitClick) {
            const filteredTasks = getFilteredTasks({
                tasks,
                taskFilter: filterValue,
                currentLatLng: currentLatLngAddress.latLng,
                IfFilterOutOfDateTasks: true,
                ifFilterHiddenTasks:true
            });
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




    const taskMarkers = useMemo(()=>{
        const props = filteredTasks.map((filterTask)=>{
            return {task:filterTask, position: filterTask.latLngAndAddress.latLng}
        })
        return markersCreator(props);
    },[filteredTasks])


    //filter bar get the filter object   
    const filterBarOnChange = useCallback((value: IFilterTasks)=>{
        // console.log(value)
        //viladate
        setFilterValue(value);
        setSubmitClick(true);
    },[]);

 
    const handlePlaceInputChange = useCallback((e: ILatLngAndAddress):void => {
        // console.log('place:' , e);
        setCurrentLatLngAddres(e);
        setSubmitClick(true);
    },[setCurrentLatLngAddres]);


    const onMarkerChangeHandle = useCallback((task: ITask):void => {
        setClickedTask(task);
    },[setClickedTask]);


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