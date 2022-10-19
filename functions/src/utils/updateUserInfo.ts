import {db, Collection} from "../db";
import { IUser } from '../../../src/interfaces/user.interface';
import getUserById from "./getUserById";

const updateUserInfo = async (
    userUid: string,
    userInput: Partial<IUser>,
):Promise<IUser | Error> => {

    return new Promise(async (resolve, reject)=>{
        const user = await getUserById(userUid);
        if(!user) reject(Error(`The user dosen't exist!`));

        const newUser:IUser = {...user!, ...userInput};
        const userRef = db.ref(`${Collection.users}/${userUid}`);
        userRef.set(newUser).then(()=>{
            resolve(newUser);
        }).catch((error)=> reject(error));
        // const userRef = db.ref(`${Collection.users}/${userUid}`);
        // (Object.keys(userInput) as (keyof IUser)[]).forEach(async (key)  => {
        //     await userRef.update({
        //         [key]: userInput[key]
        //     })
        // });
    })
};

export default updateUserInfo;
