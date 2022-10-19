
import { 
    useContext,
    useEffect
 } from 'react';
import { MyEventOrganizePageCon } from './my-event-organize-page.styles';
import { 
    NavigationContext,
    MyAccountMenuKey
 } from '../../../context/navigation.context';

 


const MyEventOrganizePage =  () => {
    const { setCurrentMenuKey } = useContext(NavigationContext);

    useEffect(()=> {
        setCurrentMenuKey(MyAccountMenuKey.EVENTS_I_ORGANIZE);
        console.log(1121212)
    },[setCurrentMenuKey]);


    return (
        <MyEventOrganizePageCon>
            organize
        </MyEventOrganizePageCon>
    )
}

export default MyEventOrganizePage;