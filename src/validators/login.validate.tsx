
export enum LoginNamesEnum {
    email = 'email',
    password = 'password',
}
export const initialValues = {
    [LoginNamesEnum.email]: '',
    [LoginNamesEnum.password]: '',
};

export const loginRules = {
    [LoginNamesEnum.email] :[
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
    [LoginNamesEnum.password] :[{ 
        required: true
    }],

}