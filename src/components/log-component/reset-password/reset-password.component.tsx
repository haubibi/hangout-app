/* eslint-disable react-hooks/rules-of-hooks */
import {
    useState,
    useCallback,
    useEffect
} from 'react';
import { 
    ResetPassWordCon,
    PasswordInput,
    SubmitButton
} from './reset-password.styles';
import { 
    Form,
    message
 } from 'antd';
import { resetPassword } from '../../../utils/firebase/firebase.utils';
import { 
    useLocation,
    useNavigate
} from 'react-router-dom';
import { 
    SignUpNamesEnum,
    signupRules
 } from '../../../validators/signup.validate';
//  {  name: LoginNamesEnum.email, rules: loginRules[LoginNamesEnum.email], item: <Input prefix={<UserOutlined />} placeholder="E-mail" />},

interface IFormItems {
    password: string;
}

const initialValues:IFormItems = {
    password: ''
};

const useUrlQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
    
}

export const ResetPassWordItem = () => {
    const [detail, setDetail] = useState<IFormItems>(initialValues);
    const [ buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const urlQuery = useUrlQuery();
    const navigate = useNavigate();
    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[setDetail])

    const onFinishFailed = useCallback(({values})=>{
        
    },[]);
    const onFinish = useCallback(async (values: IFormItems)=>{
        const { password} = values;
        const oobCode = urlQuery.get('oobCode');
        console.log('password:', password)
        console.log('oobCode:', oobCode)
        resetPassword(oobCode, password)
        .then(()=>{
            message.success('Password has been chenged, you can login now', 5);
            navigate(`/`);
        })
        .catch(error =>{
            console.log(error)
        });
        // try {
        //     await resetPassword(urlQuery.get('obbCode'), password);
        //     message.success('Password has been chenged, you can login now', 5);
        //     navigate(`/`);
        // } catch (error) {
        //     setButtonDisabled(true);
        //     message.error(error, 5).then(()=>{
        //         setButtonDisabled(false);
        //     });
        // }
        // .then(()=>{  
        //     message.success('Password has been chenged, you can login now', 5);
        //     navigate('./');
        // }).catch((error)=>{
        //     message.error(error, 5);
        // });
    },[urlQuery, navigate]);

    return (
        <ResetPassWordCon>
            <h2>Reset password</h2>
            <Form
                initialValues={detail}
                onFinish={onFinish}
                onFinishFailed = { onFinishFailed }
                layout = "vertical"
            >
                <Form.Item
                    name = {SignUpNamesEnum.password}
                    label = "new password"
                    rules = {signupRules[SignUpNamesEnum.password]}
                >
                    <PasswordInput
                        type = "password"
                    />
                </Form.Item>

                <Form.Item>
                    <SubmitButton
                        type='primary'
                        htmlType='submit'
                        disabled = {buttonDisabled}
                    >
                        Reset Password
                    </SubmitButton>
                </Form.Item>
            </Form>
        </ResetPassWordCon>
    )
}