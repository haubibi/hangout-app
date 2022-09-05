import { ITask, ITaskInputMoment, ITaskInputString} from "../interfaces/task.interface"
import { getDateString, getDateTimeString, getMomentByDateAndTimeString } from '../date/date.utils'

export const getUuiD = (uid: string) => {
    return uid+ '_' + Math.random().toString();
  }

export const taskCreator = (props: ITaskInputMoment):ITaskInputString => {
    const id = getUuiD(props.id);
    return {
        ...props,
        id,
        startDate: getDateString(props.startDate),
        startTime: getDateTimeString(props.startTime),
        endDate: getDateString(props.endDate),
        endTime: getDateTimeString(props.endTime),
    }
}

