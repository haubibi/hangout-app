import { 
    MyAccountPageCon,
    MyAccountPageSideCon,
    MyAccountPageContentCon
 } from './my-account-page.styles';
import React, { 
    useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import {
    message,
    Layout
 } from 'antd';
import { MyAccountMenu } from '../../components/my-account-page/my-account-menu/my-account-menu.component';
import { Outlet } from 'react-router-dom';



const menuColSpan = {
    xs: 3,
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
};


const MyAccountPage = () => {
    const { currentUser }= useContext(UserContext);
    const navigate = useNavigate();

    //if current user doesn't exist, back to home page
    // if(!currentUser) {
    //     message.error('Please log in / sign up first!');
    //     navigate('/'); 
    // }
    return (

        <MyAccountPageCon>
            <MyAccountPageSideCon>
                <MyAccountMenu></MyAccountMenu>
            </MyAccountPageSideCon>
            <MyAccountPageContentCon>
                <Outlet />
            </MyAccountPageContentCon>
        </MyAccountPageCon>
    )
}

export default MyAccountPage;