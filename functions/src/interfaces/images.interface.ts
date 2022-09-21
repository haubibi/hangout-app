import {UploadFile} from "antd";

export const maxUploadImageSize = 2;


export interface IImageObjWithRefPath {
    uid: string;
    name: string;
    refPath: string;
}
export interface IImageObjWithUrlAndRefPath {
    uid: string;
    name: string;
    refPath: string;
    url: string;
}
export interface IImageObjWithUrl {
    uid: string;
    name: string;
    url: string;
}


export interface TaskImagesWithUrlAndRefPath {
    showImages: IImageObjWithUrlAndRefPath[],
    frontCoverImage: IImageObjWithUrlAndRefPath | null;
}

export interface TaskImagesWithUrl{
    showImages: IImageObjWithUrl[],
    frontCoverImage: IImageObjWithUrl | null;
}

export interface TaskImagesUploadAntd{
    showImages: UploadFile[],
    frontCoverImage: UploadFile[];
}


export enum ImagesTypeName{
    TASKS = "tasks",
    DEFAULT = "default",
    USERS = "users",
}

export enum TaskImagesTypeName{
    FRONTCOVER = "frontCover",
    DISPLAYINTASK = "displayInTask",
}
export enum UsermagesTypeName{
    AVATAR = "avatar"
}
