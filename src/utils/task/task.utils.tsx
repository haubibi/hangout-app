import { ITask, ITaskInputMoment} from "../interfaces/task.interface"
import { getDateString, getDateTimeString } from '../date/date.utils'
import { getCurrentCoords } from "../googleMap/googleMap.utils";
import { defaultLatLng } from "../googleMap/googleMap.utils";
import { IUser } from '../interfaces/user.interface';




export const getUid = (uid: string) => {
    return uid+ '_' + Math.random().toString();
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
        frontCoverImage: null
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
        startDate: getDateString(props.startDate),
        startTime: getDateTimeString(props.startTime),
        endDate: getDateString(props.endDate),
        endTime: getDateTimeString(props.endTime),
    }
}

