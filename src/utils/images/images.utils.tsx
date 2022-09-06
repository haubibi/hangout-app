import { getImageUrl } from '../firebase/firebase.utils';
import { UploadFile } from 'antd';
export interface IImageObj {
    uid: string;
    name: string;
    refPath: string;
}
export interface IImageUrlObj {
    uid: string;
    name: string;
    url: string;
}
export const defaultFrontCoverImage = {
    uid: 'sdfsdf',
    refPath: 'images/users/default/frontCover/adfsdf',
    name: 'sdfsdfvv'
}

const createImagesList= async(imageObjList: IImageObj[]):Promise<Partial<UploadFile>[]> => {
    return await Promise.all(imageObjList.map(async (imageObj)=> {
        const { uid, name, refPath} = imageObj;
        const newObj = {uid, name, url: ''};
        return new Promise(async(resolve,reject)=>{
            await getImageUrl(refPath).then(url => newObj.url = url);
            resolve(newObj);
        });
    }));
}
