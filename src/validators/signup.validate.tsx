import { 
    validateInputString,
    validateStringLength,
    validatePassword
} from './validate.utils'

export const displayNameMaxLength = 15;





export enum SignUpNamesEnum {
    displayname = 'displayName',
    email = 'email',
    password = 'password',
    confirm = 'confirm',
    sex = 'sex',
    description = "description"
}
export const initialValues = {
    [SignUpNamesEnum.displayname]: '',
    [SignUpNamesEnum.email]: '',
    [SignUpNamesEnum.password]: '',
    [SignUpNamesEnum.confirm]: '',
    [SignUpNamesEnum.sex]: ''
};

export const checkDisplayNameCallBack = (_: any, value: string) => {
    // console.log(value)
    if(value.length === 0) return Promise.reject(new Error("display name can't be empty"));
    //check name valid
    if(!validateInputString(value)) return Promise.reject(new Error('name format is invalid'));
    //check length
    if(!validateStringLength(value,displayNameMaxLength)) return Promise.reject(new Error(`maximum characters is ${displayNameMaxLength}`));
    
    return Promise.resolve(); 
}
const checkPasswordCallBack = (_: any, value: string) => {
    //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
    if(!validatePassword(value)) return Promise.reject(new Error('6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter'));
   
    return Promise.resolve(); 
}



export const signupRules = {
    [SignUpNamesEnum.displayname] :[{ 
        required: true,
    },{
        validator: checkDisplayNameCallBack
    }],
    [SignUpNamesEnum.email] :[
        {
            type: 'email',
            message: 'The input is not valid E-mail',
            required: true,
        },
        { 
            required: true, 
            message: 'Please input your E-mail!' 
        }
    ],
    [SignUpNamesEnum.password] :[{ 
        required: true, 
        validator: checkPasswordCallBack
    }],
    [SignUpNamesEnum.confirm] :[
        {
            required: true,
            message: 'Please confirm your password!',
        },
        ({ getFieldValue }: any) => ({
            validator(_: any, value : any) {
            if (!value || getFieldValue(SignUpNamesEnum.password) === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
        }),
    ],
}