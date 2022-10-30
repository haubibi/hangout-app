import { createContext, FC , useState, useEffect} from "react";
import { IUser } from "../interfaces/user.interface";
import React, {Dispatch} from 'react';
import { GET_USER } from "../utils/graphql/query.utils";
import { 
    useQuery,
    NetworkStatus,
    ApolloQueryResult
 } from '@apollo/client';


const defaultUser = null;
const defaultUserId = '';
export interface IUserContext {
    currentUser: null | IUser;
    setCurrentUser: Dispatch<React.SetStateAction<IUser| null>>;
    userUid: string;
    setUserUid: Dispatch<React.SetStateAction<string>>;
    refetchUser: (variables?: Partial<{
        uid: string;
    }>) => Promise<ApolloQueryResult<any>>
}
const initUserContext:IUserContext = {
    currentUser: null,
    setCurrentUser: ()=>{},
    userUid: '',
    setUserUid: ()=>{},
    refetchUser: (variables:{uid: null})=> null
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
    const { data, refetch, networkStatus } = useQuery(GET_USER,{
        variables: {
            uid: userUid
        },
        notifyOnNetworkStatusChange: true
    });
    // console.log('userUid:',userUid);
    // console.log('currentUser:',currentUser);
    // console.log('data:',data);
    // const [addUser] = useMutation(ADD_USER);

    useEffect(()=>{
        //when refetch
        if(data && data.getUserById){
            setCurrentUser(data.getUserById);
        } else {
            if(networkStatus !== NetworkStatus.refetch) {
                setCurrentUser(null);
            }
        }
    },[data, setCurrentUser, networkStatus])
    

    const value = {
        currentUser,
        setCurrentUser,
        userUid,
        setUserUid,
        refetchUser: refetch,
    };
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}
