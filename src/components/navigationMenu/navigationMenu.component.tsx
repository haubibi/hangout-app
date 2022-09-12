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

enum MenuKey {
    HOME = 'home',
    ADDEVENT = 'addEvent',
    SIGNUP = 'signUp',
    LOGIN = 'LOG IN',
    SIGNOUT = 'SIGN OUT',
}


const signUpItem = {
    label: 'SIGN UP',
    key: MenuKey.SIGNUP,
};
const logInItem = {
    label: 'LOG IN',
    key: MenuKey.LOGIN,
};
const signOutItem = {
    label: 'SIGN OUT',
    key: MenuKey.SIGNOUT,
};

const defaultItems: MenuProps['items'] = [
    {
        label: '',
        key: MenuKey.HOME,
        icon: <PandaIcon />,
    },
    {
        label: '+ EVENT',
        key: MenuKey.ADDEVENT,
    }
]

const NavigationMenu: FC = () => {
    const [ currentKey, setCurrentKey] = useState('');
    const [ items, setItems] = useState(defaultItems);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!currentUser){
            setItems([...defaultItems, signUpItem, logInItem]);
        } else {
            setItems([...defaultItems, signOutItem]);
        }

    },[currentUser])



    const navigateTo = (key: string) =>{
        switch(key) {
            case MenuKey.HOME:
                console.log( MenuKey.HOME)
                navigate(`./`);
                break;
            case MenuKey.ADDEVENT:
                if(!currentUser) return message.error('Please login first!');
                const taskId = getUid(currentUser.uid);
                navigate(`./taskForm_${taskId}`);
                break;
            case MenuKey.SIGNUP:
                navigate(`./signUp`);
                break;
            case MenuKey.LOGIN:
                navigate(`./signIn`);
                break;
            case MenuKey.SIGNOUT:
                signOutUser();
                break;
            // case MenuKey.LOGIN:
            //     // navigate(`./taskForm_${taskId}`);
            //     break;
                
         }
    }




    const onClick: MenuProps['onClick'] = e => {
        console.log('click ', e);
        setCurrentKey(e.key);
        if(e.key !== currentKey) {
            navigateTo(e.key);
        }
    };
    return (
        <MenuCon 
            onClick={onClick} 
            selectedKeys={[currentKey]} 
            mode="horizontal" 
            items={items}
            theme = "dark"

        />
    )
}

export default NavigationMenu;    