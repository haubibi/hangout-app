import { 
    MyAccountPageCon,
    MyAccountPageSideCon,
    MyAccountPageContentCon
 } from './my-account-page.styles';
import React, { 
    useContext,
    useEffect
} from 'react';
import { 
    useNavigate,
    useLocation
 } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import {
    message,
 } from 'antd';
import { MyAccountMenu } from '../../components/my-account-page/my-account-menu/my-account-menu.component';
import { Outlet } from 'react-router-dom';




const MyAccountPage = () => {
    const { currentUser, refetchUser }= useContext(UserContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
     //check the current user
     useEffect(()=> {
        if (!currentUser) {
            message.info(`Please log in first!`);
            navigate(`/logIn`,{state:{pathname}});
        } else {
            message.destroy();
        }
    },[currentUser, navigate, pathname]);

     //refetchUser
     useEffect(()=> {
        if (currentUser) {
            refetchUser({
                uid: currentUser.uid
            });
        }
    },[currentUser, refetchUser]);

    return (

        <MyAccountPageCon>
            <MyAccountPageSideCon
                width={250}
                collapsedWidth ={0}
                collapsible
            >
                <MyAccountMenu></MyAccountMenu>
            </MyAccountPageSideCon>
            <MyAccountPageContentCon>
                <Outlet />
            </MyAccountPageContentCon>
        </MyAccountPageCon>
    )
}

export default MyAccountPage;