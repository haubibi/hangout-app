import { 
    createContext, 
    FC, 
    useState
} from "react";
import {Dispatch} from 'react';

export enum MyAccountMenuKey {
    PERSONNALINFO = 'person',
    MyEVENT = 'myEvent',
    NOTIFICATIONS = 'notifications',
    NOTIFICATIONS_APPLICATION = 'notifications_application',
    NOTIFICATIONS_REQUEST = 'notifications_request',
    NOTIFICATIONS_EVENT_UPDATE = "event_update"
}


const defaulKey = MyAccountMenuKey.PERSONNALINFO;

export interface IMyAccountContext {
    currentMyAccountMenuKey: MyAccountMenuKey
    setCurrentMyAccountMenuKey: Dispatch<React.SetStateAction<MyAccountMenuKey>>;
}
const initMyAccountContext: IMyAccountContext = {
    currentMyAccountMenuKey: defaulKey,
    setCurrentMyAccountMenuKey: ()=>{},
}

export const MyAccountMenuContext = createContext<IMyAccountContext>(initMyAccountContext);

export interface IProviderChildrenProps {
    children: JSX.Element[] | JSX.Element
}

export const MyAccountMenuProvider:FC<IProviderChildrenProps> = ({children}) =>{
    const [ currentMyAccountMenuKey, setCurrentMyAccountMenuKey ] = useState<MyAccountMenuKey>(defaulKey);

    console.log(currentMyAccountMenuKey + 'context')
    const value = {
        currentMyAccountMenuKey,
        setCurrentMyAccountMenuKey
    };
    return <MyAccountMenuContext.Provider value = {value}>{children}</MyAccountMenuContext.Provider>
}