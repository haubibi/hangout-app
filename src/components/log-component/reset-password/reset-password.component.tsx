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
        setButtonDisabled(true);
        await resetPassword(oobCode, password)
        .then(()=>{
            setButtonDisabled(false);
            message.success('Password has been chenged, you can login now', 3);
            navigate(`/`);
        })
        .catch(error =>{
            message.destroy();
            message.error(error);
            setButtonDisabled(false);
        });
    },[urlQuery, navigate]);

    return (
        <ResetPassWordCon>
            <Form
                initialValues={detail}
                onFinish={onFinish}
                onFinishFailed = { onFinishFailed }
                layout = "vertical"
                disabled = {buttonDisabled}
                wrapperCol = {{span: 24}}
            >
                <Form.Item
                    name = {SignUpNamesEnum.password}
                    label = "new password"
                    rules = {signupRules[SignUpNamesEnum.password]}
                >
                    <PasswordInput
                        type = "password"
                        placeholder='input your new password'
                    />
                </Form.Item>

                <Form.Item>
                    <SubmitButton
                        type='primary'
                        htmlType='submit'
                        disabled = {buttonDisabled}
                    >
                        Reset
                    </SubmitButton>
                </Form.Item>
            </Form>
        </ResetPassWordCon>
    )
}