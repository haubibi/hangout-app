import { IFilterTasks } from '../interfaces/task.interface';
import { IValidatorResult } from './validate.utils';

export const searchFilterValidator = (filter: IFilterTasks):IValidatorResult => {
    const {distanceRange, participantsRange} = filter, 
            result:IValidatorResult = {
                isValid: true,
                message: ''
            };
    if(participantsRange[0] > participantsRange[1]){
        result.isValid = false;
        result.message = 'Participants number is invalid!';
    }

    return result;
}