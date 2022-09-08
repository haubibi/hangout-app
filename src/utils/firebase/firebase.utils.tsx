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
import { 
  getStorage,
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult
 } from "firebase/storage";
 import {hashId} from '../usefulFunctions/hashid'
 import { UploadRequestOption } from 'rc-upload/lib/interface';
 import { IImageObj } from '../images/images.utils';
import { UploadFile } from 'antd';


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


export const updateImage = async(parentRefPath: string, file: any):Promise<UploadResult> => {
  const { uid } = file;
  const parentRef = ref(storage,parentRefPath)
  const imageRef = ref(parentRef,uid)
  return await uploadBytes(imageRef, file);
}
export const deleteImage = async (parentRefPath: string, file: any):Promise<void> => {
  const { uid } = file;
  const parentRef = ref(storage, parentRefPath);
  const imageRef = ref(parentRef, uid);
  return await deleteObject(imageRef);
}





export function customUploadImage(buckType: 'users', id: string, type: 'avatar'):((options: UploadRequestOption) => void);
export function customUploadImage(buckType: 'tasks', id: string, type: 'frontCover'):((options: UploadRequestOption) => void);
export function customUploadImage(buckType: 'tasks', id: string, type: 'showup'):((options: UploadRequestOption) => void);
export function customUploadImage(buckType:BuckType, id: string, type: userImageType | taskImageType): ((options: UploadRequestOption) => void) {
    const buckTypeRef = ref(imagesRef, buckType);
    const itemRef = ref(buckTypeRef, id);
    const categoryRef = ref(itemRef, type);
    return ({ onError, onSuccess, file}: any) => {
    const imageRef = ref(categoryRef,file.uid)
    try {
      switch(typeof file) {
        case 'string':
          uploadString(imageRef, file, 'base64url').then((snapshot) => {
            onSuccess(snapshot)
          }).catch(error =>{
            console.log(error)
            onError(error)
          });
          break;
          default:
            uploadBytes(imageRef, file).then((snapshot) => {
              console.log(snapshot.ref)
              onSuccess(snapshot)
            }).catch(error =>{
            console.log(error)
            onError(error)
          });
      }
      
    } catch(e) {
      onError(e);
    }
  }
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

