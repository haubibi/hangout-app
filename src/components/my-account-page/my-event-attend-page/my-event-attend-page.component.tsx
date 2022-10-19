
import { 
    useContext,
    useEffect
 } from 'react';
import { MyEventAttendPageCon } from './my-event-attend-page.styles';
import { 
    NavigationContext,
    MyAccountMenuKey
 } from '../../../context/navigation.context';

 


const MyEventAttendPage =  () => {
    const { setCurrentMenuKey } = useContext(NavigationContext);

    useEffect(()=> {
        setCurrentMenuKey(MyAccountMenuKey.EVENTS_I_ATTEND);
    },[setCurrentMenuKey]);


    return (
        <MyEventAttendPageCon>
            attend
        </MyEventAttendPageCon>
    )
}

export default MyEventAttendPage;