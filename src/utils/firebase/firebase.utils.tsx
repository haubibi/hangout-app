import { verify } from 'crypto';
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
    User,
    sendEmailVerification
} from 'firebase/auth';
import { 
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult
 } from "firebase/storage";
import { IAdditionalInfo, IUserInput, IUser } from '../interfaces/user.interface';

import { createBaseUser } from '../user/user.utils';

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


const app = initializeApp(firebaseConfig);
const storage = getStorage(app,'gs://hang-out-213d4.appspot.com/');




//images ref
const imagesRef = ref(storage, 'images');

export type BuckType = 'users' | 'tasks';
export type userImageType = 'avatar';
export type taskImageType = 'frontCover' | 'showup';

const metadata = {
  contentType: 'image/jpeg'
};
export const updateImage = async(parentRefPath: string, file: any):Promise<UploadResult> => {
    const { uid } = file;
    const parentRef = ref(storage,parentRefPath)
    const imageRef = ref(parentRef,uid)
    return await uploadBytes(imageRef, file.originFileObj, metadata);
  // return await uploadString(imageRef, file.thumbUrl);
}
export const deleteImage = async (parentRefPath: string, file: any):Promise<void> => {
  const { uid } = file;
  const parentRef = ref(storage, parentRefPath);
  const imageRef = ref(parentRef, uid);
  return await deleteObject(imageRef);
}




export const getImageUrl = async (refPath: string) => {
  return await getDownloadURL(ref(storage, refPath))
}


//get the auth
export const auth = getAuth();
//instance of google provider
const googleProvider = new GoogleAuthProvider();
//set the type of provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGooglePopup = async() => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = async() => signInWithRedirect(auth, googleProvider);



export const createAuthUserWithEmailAndPassword = async (email: string, password: string, additionalInfo: IAdditionalInfo):Promise<IUser> =>{
  return new Promise(async (resolve,reject)=> {
      if(!email || !password){
          reject(new Error('email or password is invaild!'))
          return;
      }
      //create user
      createUserWithEmailAndPassword(auth, email, password).then(({user}) => {
        //verify
        sendEmailVerification(user).then(()=>{
              const { email, uid } = user;
              const newUser  = createBaseUser({email, uid, ...additionalInfo} as IUserInput);
              resolve(newUser);
        }).catch((error) => {
            reject(error.code);
            // ..
          });;
        })
        .catch((error) => {
          reject(error.code);
        // ..
      });
  })
}

export const signInWithWithEmailAndPasswordMethod = async (email:string,password:string) =>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email,password);
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

