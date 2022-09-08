import { User } from "firebase/auth";
import { createContext, FC , useState, ProviderProps, useEffect} from "react";
import { IUser, IAdditionalInfo } from "../utils/interfaces/user.interface";
import React, {Dispatch} from 'react';
import { useMutation } from '@apollo/client';
import { ADDUSER } from '../utils/graphql/mutation.utils';
const initAdditionalInfo = {
    displayName: ''
}

const defaultUser: IUser = {
    email: 'biao.huangsoultaker@gmail.com',
    uid: 'sdfsdfsdfsd',
    displayName: 'biao huang'
}

export interface IUserContext {
    currentUser: null | IUser;
    setCurrentUser: Dispatch<React.SetStateAction<IUser| null>>;
    additionalInfo:IAdditionalInfo
    setAdditionalInfo: Dispatch<React.SetStateAction<IAdditionalInfo>>;
}
const initUserContext:IUserContext = {
    currentUser: null,
    setCurrentUser: ()=>{},
    additionalInfo: initAdditionalInfo,
    setAdditionalInfo: ()=>{}
}

// export const UserContext = createContext<IUserContext>({
//     currentUser: null,
//     setCurrentUser:() => React.Dispatch<React.SetStateAction<IUser>>
// });
export const UserContext = createContext<IUserContext>(initUserContext);
export interface IProviderChildrenProps {
    children: JSX.Element[] | JSX.Element
}

export const UserProvider:FC<IProviderChildrenProps> = ({children}) =>{
    const [currentUser, setCurrentUser] = useState<IUser | null>(defaultUser);
    const [additionalInfo, setAdditionalInfo] = useState<IAdditionalInfo>(initAdditionalInfo);
    const [addUser] = useMutation(ADDUSER);


    // console.log(currentUser)
    useEffect(()=>{
        if(currentUser !== null){
            const add = async()=>{
                await addUser({
                   variables:{userInput: currentUser} 
                });
            }
            add();
        }
        // console.log(user, currentUser)

    },[currentUser])

    const value = {
        currentUser,
        setCurrentUser,
        additionalInfo,
        setAdditionalInfo
    };
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}

// interface ProviderProps<T> {
//     value: T;
//     children?: ReactNode | undefined;
// }