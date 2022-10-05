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
import { 
    useNavigate,
    useLocation
 } from 'react-router-dom';
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
const formitems = [
    {  name: LoginNamesEnum.email, rules: loginRules[LoginNamesEnum.email], item: <Input prefix={<UserOutlined />} placeholder="E-mail" />},
    {  name: LoginNamesEnum.password, rules: loginRules[LoginNamesEnum.password], item: <Input prefix={<LockOutlined />} type="password" placeholder="password" />},
]

export interface IStateWithPathname {
    pathname: string;
}

const SignInItem = () => {
    const { setUserUid } = useContext(UserContext)
    const { setCurrentMenuKey } = useContext(NavigationContext)
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const { state } = useLocation();
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
        setButtonDisabled(true);
        console.log('Success:', values);
        const { email, password} = values;
        signInWithWithEmailAndPasswordMethod(email, password).then((credential: UserCredential | undefined)=>{
            // console.log(2222, credential.user.emailVerified)
            // if(credential.user.emailVerified){
                setUserUid(credential.user.uid);
                if(
                    Object.prototype.toString.call(state) === '[object Object]' &&
                    Object.prototype.hasOwnProperty.call(state, 'pathname')
                ) {
                    console.log("login pathname:", (state as IStateWithPathname).pathname)
                    navigate(`${(state as IStateWithPathname).pathname}`,{replace: true});
                } else {
                    navigate(`/`);
                }
        }).catch(error => {
            setButtonDisabled(false);
            message.error(error, 3);
        });
        
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