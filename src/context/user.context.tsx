import { createContext, FC , useState, useEffect} from "react";
import { IUser } from "../interfaces/user.interface";
import React, {Dispatch} from 'react';
import { GETUSER } from "../utils/graphql/query.utils";
import getUserById from '../../functions/src/operateDatabaseFunctions/getUserById';
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
    refetch: (variables?: Partial<{
        uid: string;
    }>) => Promise<ApolloQueryResult<any>>
}
const initUserContext:IUserContext = {
    currentUser: null,
    setCurrentUser: ()=>{},
    userUid: '',
    setUserUid: ()=>{},
    refetch: (variables:{uid: null})=> { return null}
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
    const { data, refetch, networkStatus } = useQuery(GETUSER,{
        variables: {
            uid: userUid
        },
        notifyOnNetworkStatusChange: true
    });
    console.log('userUid:',userUid);
    console.log('currentUser:',currentUser);
    console.log('data:',data);
    // const [addUser] = useMutation(ADDUSER);

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
    
    // console.log(currentUser)
    // useEffect(()=>{
    //     if(currentUser !== null && currentUser.uid !== null){
    //         const add = async()=>{
    //             await addUser({
    //                 variables:{userInput: currentUser} 
    //             });
    //         }
    //         add();
    //     }
    //     // console.log(user, currentUser)

    // },[currentUser, addUser])

    const value = {
        currentUser,
        setCurrentUser,
        userUid,
        setUserUid,
        refetch,
    };
    return <UserContext.Provider value = {value}>{children}</UserContext.Provider>
}

// interface ProviderProps<T> {
//     value: T;
//     children?: ReactNode | undefined;
// }