import { 
    useState, 
    useEffect,
    useContext,
} from 'react';
import { 
    SignInItemContainer,
    ForgetPasswordLink,
} from './sign-in-item.styles';
import { 
    Button, 
    Form, 
    Input, 
    message 
} from 'antd';
import { 
    LockOutlined, 
    UserOutlined 
} from '@ant-design/icons';
import { signInWithWithEmailAndPasswordMethod } from '../../../utils/firebase/firebase.utils'
import { useNavigate } from 'react-router-dom';
import { UserCredential } from 'firebase/auth';
import { UserContext } from '../../../context/user.context';
import { 
    LoginNamesEnum,
    loginRules,
    initialValues
} from '../../../validators/login.validate';
import { 
    MenuKey, 
    NavigationContext 
} from '../../../context/navigation.context';
import ForgetPassWordForm from '../../../routers/forget-password-form/forget-password-form.component';
const formitems = [
    {  name: LoginNamesEnum.email, rules: loginRules[LoginNamesEnum.email], item: <Input prefix={<UserOutlined />} placeholder="E-mail" />},
    {  name: LoginNamesEnum.password, rules: loginRules[LoginNamesEnum.password], item: <Input prefix={<LockOutlined />} type="password" placeholder="password" />},
]


const SignInItem = () => {
    const { setUserUid } = useContext(UserContext)
    const { setCurrentMenuKey } = useContext(NavigationContext)
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const navigate = useNavigate();

    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[setDetail])

    //set the menu
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.LOGIN);
    },[setCurrentMenuKey])


    const onFinish = async(values: any) => {
        console.log('Success:', values);
        const { email, password} = values;
        signInWithWithEmailAndPasswordMethod(email, password).then((credential: UserCredential | undefined)=>{
            console.log(2222, credential.user.emailVerified)
            // if(credential.user.emailVerified){
                setUserUid(credential.user.uid);
                navigate(`/`);
            // } else {
            //     setButtonDisabled(true);
            //     message.info('Please verify it in you e-mail!', 5, () => setButtonDisabled(false));
            // }
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
                    <ForgetPasswordLink to = "/forget-password">Forget password?</ForgetPasswordLink>
                </Form.Item>
                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        disabled = {buttonDisabled}
                    >
                        Log in
                    </Button>
                </Form.Item>
                </Form>
        </SignInItemContainer>
    )
}

export default SignInItem;