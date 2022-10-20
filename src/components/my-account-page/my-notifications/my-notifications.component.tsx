
import { useContext } from 'react';
import { UserContext } from '../../../context/user.context';
import { MyNotificationsCon } from './my-notifications.styles';
import { Spin } from 'antd';
import { Outlet } from 'react-router-dom';



const MyNotifications = () => {
    const {currentUser} = useContext(UserContext);
    if(!currentUser) return <Spin />
    return (
        <MyNotificationsCon>
            <Outlet/>
        </MyNotificationsCon>
    )
}

export default MyNotifications;