import { UploadFile } from 'antd';
import { UploadResult } from 'firebase/storage'
import { updateImage, deleteImage, getImageUrl } from '../firebase/firebase.utils';
export interface IImageObj {
    uid: string;
    name: string;
    refPath: string;
}
export interface IImageObjWithUrl {
    uid: string;
    name: string;
    refPath: string;
    url: string;
}

export enum ImagesTypeName{
    TASKS = 'tasks',
    DEFAULT = 'default',
    USERS = 'users'
};
export enum TaskImagesTypeName{
    FRONTCOVER = 'frontCover',
    DISPLAYINTASK = 'displayInTask',
};
export enum UsermagesTypeName{
    AVATAR = 'avatar'
};

interface IModifiedUploadFile {
    addFilesList: UploadFile[],
    deleteFilesList: UploadFile[]
}



export const defaultFrontCoverImage = {
    uid: 'test',
    refPath: 'images/default/frontCover/',
    name: 'test',
    url: 'sdfsd'
}



// export const getImagesWithUrl = async(imageObjList: IImageObj[]):Promise<IImageObjWithUrl[]>=>{
//     const promises:Promise<IImageObjWithUrl>[] = imageObjList.map(imageObj => {
//         return new Promise(async (resolve,rejects)=>{
//             const { uid, name, refPath} = imageObj;
//             const newObj:IImageObjWithUrl = {uid, name, url: ''};
//             try {
//                 await getImageUrl(refPath).then(url => newObj.url = url);
//                 resolve(newObj as IImageObjWithUrl);
//             } catch(error) {
//                 rejects(error);
//             }
//         });
//     });
//     return Promise.all(promises);
// }





const CheckIfUidExist = (uid: string, fileList: UploadFile[]) => {
    return fileList.findIndex(v => v.uid === uid) !== -1;
}

const getModifedUploadFileObjByUid = (preFileList:UploadFile[], currentFileList:UploadFile[]):IModifiedUploadFile =>{
    console.log(preFileList, currentFileList)
    const addFilesList:UploadFile[] = [], deleteFilesList:UploadFile[] = [];

    for(const preFile of preFileList) {
        const preUid = preFile.uid;
        const ifExists = CheckIfUidExist(preUid, currentFileList);
            if(!ifExists) {
                deleteFilesList.push(preFile);
            }
    }
    for(const currentFile of currentFileList) {
        const currentUid = currentFile.uid;
        const ifExists = CheckIfUidExist(currentUid, preFileList);
            if(!ifExists) {
                addFilesList.push(currentFile);
            }
    }

    return {
        addFilesList,
        deleteFilesList
    }
}


export async function updateImages(imageType: ImagesTypeName.USERS, uid: string, subType: UsermagesTypeName.AVATAR, preFileList:UploadFile[],currentFileList:UploadFile[]):Promise<(UploadResult | Promise<void>[])[]>;
export async function updateImages(imageType: ImagesTypeName.TASKS, uid: string, subType: TaskImagesTypeName.FRONTCOVER,preFileList:UploadFile[],currentFileList:UploadFile[]):Promise<(UploadResult | Promise<void>[])[]>;
export async function updateImages(imageType: ImagesTypeName.TASKS, uid: string, subType: TaskImagesTypeName.DISPLAYINTASK,preFileList:UploadFile[],currentFileList:UploadFile[]):Promise<(UploadResult | Promise<void>[])[]>;
export async function updateImages(imageType: ImagesTypeName, uid: string, subType: UsermagesTypeName | TaskImagesTypeName,preFileList:UploadFile[],currentFileList:UploadFile[]): Promise<(UploadResult | Promise<void>[])[]> {
    const parentRefPath = `images/${imageType}/${uid}/${subType}`;
    const {addFilesList, deleteFilesList} = getModifedUploadFileObjByUid(preFileList, currentFileList);
    const addPromises = addFilesList.map((addFile) => updateImage(parentRefPath,addFile));
    const deletePromises = deleteFilesList.map((deleteFile) => deleteImage(parentRefPath,deleteFile));
    // currentFileList

    return Promise.all([...addPromises,deletePromises]);
}


// export interface IImageObjWithUrl {
//     uid: string;
//     name: string;
//     refPath: string;
//     url: string;
// }


// IImageObj
export const getNewImageObj = (imageObjs: IImageObj[]) =>{
    const promises = imageObjs.map((imageObj)=>{
        return new Promise((resolve)=>{
            getImageUrl(imageObj.refPath).then((url)=>{
                resolve({
                    ...imageObj,
                    url
                } as IImageObjWithUrl)
            })
        });
    });

    return Promise.all(promises);
}
