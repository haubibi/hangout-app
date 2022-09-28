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





export const personalInfoRules = {
    [SignUpNamesEnum.displayname] :[{
        validator: checkDisplayNameCallBack
    }],
}