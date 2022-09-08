import { ITask, ITaskInputMoment, ITaskInputString} from "../interfaces/task.interface"
import { getDateString, getDateTimeString, getMomentByDateAndTimeString } from '../date/date.utils'
import { LatLngLiteral } from '../interfaces/google.interface'
import { defaultLatLng, defaultAddress } from "../googleMap/googleMap.utils";
import { defaultFrontCoverImage } from '../images/images.utils';

export const getUuiD = (uid: string) => {
    return uid+ '_' + Math.random().toString();
}

console.log(new Date())

export const baseTaskCreator =  (): ITask => {
    const location: LatLngLiteral = defaultLatLng;
    const address: string = defaultAddress;
    return {
        id: '',
        title: '',
        organizer: {
            uid: '',
            displayName: '',
            // avatarStr: '',
            email: ''
        },
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        participants: [],
        reviews: [],
        hide: false,
        open:true,
        participantsNumber: 0,
        location,
        address,
        description:'',
        showImages:[],
        frontCoverImage: defaultFrontCoverImage
    }
}

// export const getdefaultTask = () => await baseTaskCreator();

export const taskCreator = (baseTask: ITask, props: ITaskInputMoment):ITask => {
    const id = getUuiD(props.id);
    return {
        ...baseTask,
        ...props,
        id,
        startDate: getDateString(props.startDate),
        startTime: getDateTimeString(props.startTime),
        endDate: getDateString(props.endDate),
        endTime: getDateTimeString(props.endTime),
    }
}

