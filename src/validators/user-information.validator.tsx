import { message } from 'antd';
import { 
    SignUpNamesEnum,
    checkDisplayNameCallBack
 } from './signup.validate';
import { 
    validateInputString,
    validateStringLength,
    validatePassword
} from './validate.utils'

const personalDescriptionMaxLength = 50;

const checkPersonalDescriptionCallBack = (_: any, value: string | null) => {
    console.log(value)
    if(value === null) return Promise.resolve(); 
    //check length
    if(!validateStringLength(value,personalDescriptionMaxLength)) return Promise.reject(new Error(`maximum characters is ${personalDescriptionMaxLength}`));
    
    return Promise.resolve(); 
}

export const personalInfoRules = {
    [SignUpNamesEnum.displayname] :[{
        validator: checkDisplayNameCallBack
    }],
    [SignUpNamesEnum.description] :[{
        validator: checkPersonalDescriptionCallBack
    }
],
}