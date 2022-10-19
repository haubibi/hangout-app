import { MyEventCon } from './my-event-page.styles';
import { Outlet } from 'react-router-dom';


const MyEventPage =  () => {
    return (
        <MyEventCon>
            My event list
            <Outlet />
        </MyEventCon>
    )
}

export default MyEventPage;