import {
    useState,
    useCallback,
    useEffect
} from 'react';
import { 
    ForgetPassWordCon,
    EmailInput,
    SubmitButton,
} from './forget-password.styles';
import {
    message, 
    Form
} from 'antd';
import { forgetPassword } from '../../../utils/firebase/firebase.utils';
import { 
    LoginNamesEnum,
    loginRules
 } from '../../../validators/login.validate';
 import { 
    useNavigate
} from 'react-router-dom';

interface IFormItems {
    email: string;
}

const initialValues:IFormItems = {
    email: ''
};

export const ForgetPassWordItem = () => {
    const [detail, setDetail] = useState<IFormItems>(initialValues);
    const navigate = useNavigate();

    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[setDetail])

    const onFinishFailed = useCallback(({values})=>{
        
    },[]);
    const onFinish = useCallback((values: IFormItems)=>{
        const { email} = values;
        forgetPassword(email).then(()=>{
            navigate(`/`);
            message.success('The reset password mail has been sent!', 5);
        }).catch(error =>{
            message.error(error, 5);
        });
    },[navigate]);

    return (
        <ForgetPassWordCon>
            <Form
                initialValues={detail}
                onFinish={onFinish}
                onFinishFailed = { onFinishFailed }
                layout = "vertical"
            >
                <Form.Item
                    name = {LoginNamesEnum.email}
                    label = "Email address"
                    wrapperCol={{span: 24}}   
                    rules = {loginRules[LoginNamesEnum.email]}
                >
                    <EmailInput
                        placeholder='input your e-mail address'
                    />
                </Form.Item>

                <Form.Item>
                    <SubmitButton
                        type='primary'
                        htmlType='submit'
                    >Send</SubmitButton>
                </Form.Item>
            </Form>
        </ForgetPassWordCon>
    )
}