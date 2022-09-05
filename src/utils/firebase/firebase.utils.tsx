import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
    signOut,
    onAuthStateChanged,
    NextOrObserver,
    User
} from 'firebase/auth';
import { useQuery } from '@apollo/client';
// import { ADDUSER } from '../graphql/userGraphql.utils';
import {
  getDatabase,
  ref,
  onValue,
  set,
  get,
  child,
  DatabaseReference
} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCeT3ANdqXNbquxmYay1gm9O-8NgqlpakA",
  authDomain: "hang-out-213d4.firebaseapp.com",
  databaseURL: "https://hang-out-213d4-default-rtdb.firebaseio.com",
  projectId: "hang-out-213d4",
  storageBucket: "hang-out-213d4.appspot.com",
  messagingSenderId: "290230702663",
  appId: "1:290230702663:web:f6f3a7f74c3e50aeb89762",
  measurementId: "G-1312EJCKX0"
};



const firebaseApp = initializeApp(firebaseConfig);
//get the auth
export const auth = getAuth();
//get the firebase storage
export const db = getDatabase();

const dbRef = ref(db);
//instance of google provider
const googleProvider = new GoogleAuthProvider();
//set the type of provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGooglePopup = async() => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = async() => signInWithRedirect(auth, googleProvider);

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) =>{
    if(!email || !password) return;
        return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithWithEmailAndPasswordMethod = async (email:string,password:string) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email,password)
}

export const signOutUser = async () => await signOut(auth);


export const onUserAuthStateChanged = (callback: NextOrObserver<User>) =>{
    onAuthStateChanged(auth,callback);
}









// export const createUserDocumentFromAuth = async (
//   userAuth: User, 
//   additionalInfor?: IAdditionalInformation
// ):Promise<void | DatabaseReference> => {
//   if(!userAuth) return;
//   await get(child(dbRef, `users/${userAuth['uid']}`)).then((userSnapshot) => {
//     if (userSnapshot.exists()) {
//         return userSnapshot;
//     } else {
//       const {displayName, email, uid} = userAuth;
//       set(ref(db, 'users/' + userAuth['uid']), {
//         uid,
//         displayName,
//         email,
//         ...additionalInfor
//       });
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
// }

//   export interface IObjectYoAdd {
//     title: string;
//   }

//   export interface IAdditionalInformation {
//     displayName?: string;
//   }

//   export interface IUserData {
//     createAt: Date;
//     displayname: string;
//     email: string;
//   }

//   export interface IAdditionalInfo {
//     displayName?:string;
//   }

