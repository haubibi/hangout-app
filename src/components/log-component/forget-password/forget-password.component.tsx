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
//  {  name: LoginNamesEnum.email, rules: loginRules[LoginNamesEnum.email], item: <Input prefix={<UserOutlined />} placeholder="E-mail" />},

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
            forget password
            <Form
                initialValues={detail}
                onFinish={onFinish}
                onFinishFailed = { onFinishFailed }
                layout = "vertical"
            >
                <Form.Item
                    name = {LoginNamesEnum.email}
                    label = "Email address"
                    
                    rules = {loginRules[LoginNamesEnum.email]}
                >
                    <EmailInput
                        placeholder='E-mail'
                    />
                </Form.Item>

                <Form.Item>
                    <SubmitButton
                        type='primary'
                        htmlType='submit'
                    >Submit</SubmitButton>
                </Form.Item>
            </Form>
        </ForgetPassWordCon>
    )
}