import { useState, useEffect,useContext } from 'react';
import { SignInItemContainer} from './sign-in-item.styles';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { signInWithWithEmailAndPasswordMethod } from '../../utils/firebase/firebase.utils'
import { useNavigate } from 'react-router-dom';
import { UserCredential } from 'firebase/auth';
import { UserContext } from '../../context/user.context';
import { 
    LoginNamesEnum,
    loginRules,
    initialValues
 } from '../../validators/login.validate';

const formitems = [
    {  name: LoginNamesEnum.email, rules: loginRules[LoginNamesEnum.email], item: <Input prefix={<UserOutlined />} placeholder="Username" />},
    {  name: LoginNamesEnum.password, rules: loginRules[LoginNamesEnum.password], item: <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="password" />},
]


const SignInItem = () => {
    const { setUserUid } = useContext(UserContext)
    const [ detail, setDetail] = useState<Record<string, any>>();
    const navigate = useNavigate();

    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[])


    const onFinish = async(values: any) => {
        console.log('Success:', values);
        const { email, password} = values;
        signInWithWithEmailAndPasswordMethod(email, password).then((credential: UserCredential | undefined)=>{
            // if(credential) {
            //     const uid = credential.user.uid;
            //     console.log(uid)
            //     setUserUid(uid);
            // }
            navigate(`/`);
        }).catch(error => message.error(error));
        
      };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <SignInItemContainer>
            <Form
                name="logIn"
                initialValues={detail}
                onFinish={onFinish}
                onFinishFailed = { onFinishFailed }
                >
                {
                    formitems.map(({item,rules,...otherProps}, index) => <Form.Item key = {index} {...otherProps} rules = {rules}>{item as JSX.Element}</Form.Item>)
                            
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Log in
                    </Button>
                </Form.Item>
                </Form>
        </SignInItemContainer>
    )
}

export default SignInItem;