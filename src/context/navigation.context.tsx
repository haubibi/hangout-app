import { 
    createContext, 
    FC, 
    useState
} from "react";
import {Dispatch} from 'react';

export enum MenuKey {
    HOME = 'HOME',
    ADDEVENT = 'ADDEVENT',
    SIGNUP = 'SIGNUP',
    LOGIN = 'LOGIN',
    SIGNOUT = 'SIGNOUT',
    USER = 'USER',
    NOTIFICATION = 'NOTIFICATIONS',
    TASK = 'TASK',
    MYACCOUNT = 'MYACCOUNT',
    SEARCHONMAP = 'SEARCHONMAP',
    RESETPASSWORD = 'RESETPASSWORD',
    FORGETPASSWORD = 'FORGETPASSWORD',
}
export enum MyAccountMenuKey {
    PERSONNALINFO = 'person',
    EVENTS = 'events',
    EVENTS_I_ORGANIZE = 'event_organize',
    EVENTS_I_ATTEND = 'event_attend',
    NOTIFICATIONS = 'notifications',
    NOTIFICATIONS_APPLICATION = 'notifications_application',
    NOTIFICATIONS_REQUEST = 'notifications_request',
    NOTIFICATIONS_EVENT_UPDATE = "event_update"
}

const defaulKey = MenuKey.HOME;

export interface INavigationContext {
    currentMenuKey: MenuKey | MyAccountMenuKey
    setCurrentMenuKey: Dispatch<React.SetStateAction<MenuKey | MyAccountMenuKey>>;
}
const initUserContext: INavigationContext = {
    currentMenuKey: defaulKey,
    setCurrentMenuKey: ()=>{},
}

export const NavigationContext = createContext<INavigationContext>(initUserContext);

export interface IProviderChildrenProps {
    children: JSX.Element[] | JSX.Element
}

export const NavigationProvider:FC<IProviderChildrenProps> = ({children}) =>{
    const [ currentMenuKey, setCurrentMenuKey ] = useState<MenuKey>(defaulKey);

    console.log(currentMenuKey + 'context')
    const value = {
        currentMenuKey,
        setCurrentMenuKey
    };
    return <NavigationContext.Provider value = {value}>{children}</NavigationContext.Provider>
}