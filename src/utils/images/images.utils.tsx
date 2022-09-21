import { UploadFile } from 'antd';
import { UploadResult } from 'firebase/storage'
import { updateImage, deleteImage, getImageUrl } from '../firebase/firebase.utils';
import {
    IImageObjWithUrlAndRefPath,
    IImageObjWithUrl,
    ImagesTypeName,
    UsermagesTypeName,
    TaskImagesTypeName,
    IImageObjWithRefPath
} from '../../interfaces/images.interface';


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



export const transformImageToWithoutRefPath = (imagesWithUrlAndRefPath: IImageObjWithUrlAndRefPath[] | []):(IImageObjWithUrl[] | []) => {
    if(Array.isArray(imagesWithUrlAndRefPath)){
        if(imagesWithUrlAndRefPath.length !== 0){
            return imagesWithUrlAndRefPath.map((imageWithUrlAndRefPath)=> {
                const { refPath, ...imagesWithUrl} = imageWithUrlAndRefPath;
                return imagesWithUrl;
            });
        }
        return [];
    }
    return [];
}










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




export function getImagesWithRefPath(imageType: ImagesTypeName.USERS, taskOrUserId: string, subType: UsermagesTypeName.AVATAR, files:UploadFile[]): IImageObjWithRefPath[];
export function getImagesWithRefPath(imageType: ImagesTypeName.TASKS, taskOrUserId: string, subType: TaskImagesTypeName.FRONTCOVER,files:UploadFile[]): IImageObjWithRefPath[];
export function getImagesWithRefPath(imageType: ImagesTypeName.TASKS, taskOrUserId: string, subType: TaskImagesTypeName.DISPLAYINTASK,files:UploadFile[]): IImageObjWithRefPath[];
export function getImagesWithRefPath(imageType: ImagesTypeName, taskOrUserId: string, subType: UsermagesTypeName | TaskImagesTypeName,files:UploadFile[]): IImageObjWithRefPath[] {
    return files.map((file: UploadFile) => {
        const { uid, name } = file;
        const refPath = `images/${imageType}/${taskOrUserId}/${subType}/${uid}`;
        return {
            uid,
            name,
            refPath
        }
    });

}





export const getImagesWithUrlAndRefPath = (imageObjs: IImageObjWithRefPath[]) =>{
    const promises = imageObjs.map((imageObj)=>{
        return new Promise((resolve)=>{
            getImageUrl(imageObj.refPath).then((url)=>{
                console.log(url);
                resolve({
                    ...imageObj,
                    url
                });
            })
        });
    });
    return Promise.all(promises);
}

