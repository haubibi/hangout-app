import { createContext, FC , useState, useEffect} from "react";
import { IUser } from "../utils/interfaces/user.interface";
import React, {Dispatch} from 'react';
import { useMutation } from '@apollo/client';
import { GETUSER } from "../utils/graphql/query.utils";
import { ADDUSER } from '../utils/graphql/mutation.utils';
import { useQuery } from '@apollo/client';
// 349274297@qq.com
// const defaultUser: IUser = {
//     email: 'biao.huangsoultaker@gmail.com',
//     uid: 'bktSHruMl2dkX6cOF0qivPTT4lS2',
//     displayName: 'biao huang',
//     sex: 'male',
//     avatarImg: null,
//     friendsList: []
// }
const defaultUser = null;
const defaultUserId = '';
export interface IUserContext {
    currentUser: null | IUser;
    setCurrentUser: Dispatch<React.SetStateAction<IUser| null>>;
    userUid: string;
    setUserUid: Dispatch<React.SetStateAction<string>>;
}
const initUserContext:IUserContext = {
    currentUser: null,
    setCurrentUser: ()=>{},
    userUid: '',
    setUserUid: ()=>{},
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
    const [ currentUser, setCurrentUser ] = useState<IUser | null>(defaultUser);
    const [ userUid, setUserUid ] = useState<string>(defaultUserId);
    const { data } = useQuery(GETUSER,{
        variables: {
            uid: userUid
        }
    });
    const [addUser] = useMutation(ADDUSER);

    useEffect(()=>{
        if(data && data.getUserById){
          setCurrentUser(data.getUserById);
        } else{
            setCurrentUser(null);
        }
    },[data, setCurrentUser])
    
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

    },[currentUser, addUser])

    const value = {
        currentUser,
        setCurrentUser,
        userUid,
        setUserUid,
    };
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}

// interface ProviderProps<T> {
//     value: T;
//     children?: ReactNode | undefined;
// }