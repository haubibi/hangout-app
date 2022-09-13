import { ITask, ITaskInputMoment, ITaskFormItemDetailWithImageRefAndUrl} from "../interfaces/task.interface"
import { getDateString, getDateTimeString } from '../date/date.utils'
import { getCurrentCoords } from "../googleMap/googleMap.utils";
import { defaultLatLng } from "../googleMap/googleMap.utils";
import { IUser } from '../interfaces/user.interface';




export const getUid = (uid: string) => {
    return uid+ '_' + Math.random().toString().replace(/\./,'');
}


export const baseTaskCreator =  async(
    id: string, 
    organizer: IUser
): Promise<ITask> => {
    const task: ITask =  {
        id,
        title: '',
        organizer,
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        participants: [],
        reviews: [],
        hide: false,
        open:true,
        participantsNumber: 0,
        latLngAndAddress: {
            latLng: defaultLatLng,
            address: ''
        },
        description:'',
        showImages:[],
        frontCoverImage: null,
        keyWords: [],
        rate: []
    };
    return new Promise(async (resolve, reject)=>{
        await getCurrentCoords().then((location)=>{
            if(location){
                task.latLngAndAddress.latLng = location;
            }
            resolve(task);
        })
    });
}

export const taskCreator = (baseTask: ITask, props: ITaskInputMoment):ITask => {
    return {
        ...baseTask,
        ...props,
        startDate: props.startDate ? getDateString(props.startDate): undefined,
        startTime: props.startTime? getDateTimeString(props.startTime): undefined,
        endDate: props.endDate? getDateString(props.endDate): undefined,
        endTime: props.endTime? getDateTimeString(props.endTime) : undefined,
    }
}



export const getUpdatedTask = (currentTask: ITask, formValues: ITaskFormItemDetailWithImageRefAndUrl): ITask =>{
    console.log(currentTask ,formValues)
    const { 
        title,
        description,
        hide,
        open,
        participantsNumber,
        startDate,
        startTime,
        endDate,
        endTime,
        latLngAndAddress,
        showImages,
        frontCoverImage,
        keyWords
    } = formValues;
    const startDateString = getDateString(startDate!)
    const startTimeString = getDateTimeString(startTime!)
    const endtDateString = getDateString(endDate!)
    const endTimeString = getDateTimeString(endTime!)

    return {
        ...currentTask,
        title,
        description,
        hide,
        open,
        participantsNumber,
        startDate: startDateString,
        startTime: startTimeString,
        endDate: endtDateString,
        endTime: endTimeString,
        latLngAndAddress,
        showImages,
        frontCoverImage,
        keyWords
    }

}


