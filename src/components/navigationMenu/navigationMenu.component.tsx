import { 
    FC,
    useState, 
    useContext,
    useEffect
 } from 'react'
import React from "react";
import { 
    MenuProps,
    message
 } from 'antd';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { useNavigate } from 'react-router-dom';
import { getUid } from '../../utils/task/task.utils';
import { PandaIcon } from '../../assets/svgIcon/custom.icon';
import { UserContext } from '../../context/user.context';
import { MenuCon } from './navigationMenu.styles';
import { 
    GithubFilled, 
    BellFilled,
    EnvironmentOutlined,
    PlusSquareFilled,
    LoginOutlined,
    UserOutlined 
} from '@ant-design/icons';
import { MenuKey, NavigationContext } from '../../context/navigation.context';
import Icon from '@ant-design/icons';
import { UserAvatarBase } from '../user-avatar/user-avatar-base/user-avatar-base.component';
import { IUser } from '../../interfaces/user.interface';
import { IImageObjWithUrlAndRefPath } from '../../interfaces/images.interface';
// export enum MenuKey {
//     HOME = 'HOME',
//     ADDEVENT = 'ADDEVENT',
//     SIGNUP = 'SIGNUP',
//     LOGIN = 'LOGIN',
//     SIGNOUT = 'SIGNOUT',
//     USER = 'USER',
//     NOTIFICATION = 'NOTIFICATION'
// }


const signUpItem = {
    label: 'SIGN UP',
    key: MenuKey.SIGNUP,
};
const logInItem = {
    label: 'LOG IN',
    key: MenuKey.LOGIN,
};

const searchOnMapItem = {
    label: 'Search on map',
    key: MenuKey.SEARCHONMAP,
    icon: <EnvironmentOutlined  />
}


const userItem = (disabledKeys: MenuKey[], userAvatarImg: IImageObjWithUrlAndRefPath) => {
    const childrenItems = [
        { label: 'Event', key: MenuKey.ADDEVENT , icon: <PlusSquareFilled />, disabled: false},
        { label: 'My account', key: MenuKey.MYACCOUNT, icon: <UserOutlined  /> , disabled: false},
        { label: 'Sign out', key: MenuKey.SIGNOUT, icon: <LoginOutlined /> , disabled: false},
    ]

    for (const item of childrenItems) {
        for(const disabledKey of disabledKeys) {
            if(disabledKey === item.key) item.disabled = true;
        }
    }
    return {
        key: MenuKey.USER,
        icon: <UserAvatarBase userAvatarImg={userAvatarImg}/>,
        // icon: <GithubFilled style = {{transform:'scale(2.5)'}}/>,
        children: childrenItems,
    }
}

const getSelectedkey = (currentKey: MenuKey | ''):(MenuKey| '')[] => {
    return currentKey === MenuKey.ADDEVENT? ['']: [currentKey];
}



const defaultItems: MenuProps['items'] = [
    {
        label: '',
        key: MenuKey.HOME,
        icon: <PandaIcon />,
    },
    searchOnMapItem
]



const NavigationMenu= () => {
    const { currentMenuKey, setCurrentMenuKey } = useContext(NavigationContext)
    const [ items, setItems] = useState(defaultItems);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        const disabledKeys: [] = [];
        // console.log('currentUser:'+currentUser)
        if(!currentUser){
            setItems([...defaultItems, signUpItem, logInItem]);
        } else {
            console.log(currentMenuKey ===  MenuKey.MYACCOUNT)
            if(
                (currentMenuKey === MenuKey.ADDEVENT) ||
                (currentMenuKey === MenuKey.MYACCOUNT)
            ) {
                setItems([...defaultItems, userItem([...disabledKeys, currentMenuKey],currentUser.avatarImg)]);
            } else {
                setItems([...defaultItems, userItem(disabledKeys,currentUser.avatarImg)]);
            }
        }

    },[currentUser, currentMenuKey])



    const navigateTo = (key: MenuKey) =>{
        switch(key) {
            case MenuKey.HOME:
                navigate(`./`);
                setCurrentMenuKey(MenuKey.HOME);
                break;
            case MenuKey.MYACCOUNT:
                navigate(`./myAccount`);
                setCurrentMenuKey(MenuKey.MYACCOUNT);
                break;
            case MenuKey.ADDEVENT:
                const taskId = getUid(currentUser!.uid);
                navigate(`./taskForm_${taskId}`);
                setCurrentMenuKey(MenuKey.ADDEVENT);
                break;
            case MenuKey.SIGNUP:
                navigate(`./signUp`);
                setCurrentMenuKey(MenuKey.SIGNUP);
                break;
            case MenuKey.LOGIN:
                navigate(`./logIn`);
                setCurrentMenuKey(MenuKey.LOGIN);
                break;
            case MenuKey.SEARCHONMAP:
                navigate(`./mapSearch`);
                setCurrentMenuKey(MenuKey.SEARCHONMAP);
                break;
            case MenuKey.SIGNOUT:
                signOutUser().then(()=>{
                    console.log(111)
                    navigate(`./`);
                    setCurrentMenuKey(MenuKey.HOME);
                });
                break;           
         }
        //  setCurrentKey(key);
        //  setCurrentMenuKey(key);
    }




    const onClick: MenuProps['onClick'] = e => {
        // console.log('click ', e);
        if(e.key !== currentMenuKey) {
            navigateTo(e.key as MenuKey);
        }
    };
    return (
        <MenuCon 
            onClick={onClick} 
            selectedKeys={getSelectedkey(currentMenuKey)} 
            mode= "horizontal" 
            items={items}
            theme = "dark"
        />
    )
}

export default NavigationMenu;    