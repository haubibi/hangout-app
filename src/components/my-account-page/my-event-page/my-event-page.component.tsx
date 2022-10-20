import { MyEventCon } from './my-event-page.styles';
import { Outlet } from 'react-router-dom';


const MyEventPage =  () => {
    return (
        <MyEventCon>
            <Outlet />
        </MyEventCon>
    )
}

export default MyEventPage;