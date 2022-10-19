import { 
    useState, 
    useEffect,
    useContext,
} from 'react';
import { 
    SignInItemContainer,
    ForgetPasswordLink,
    EmailVerifyModal,
    EmailVerifySpan
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
import { UserContext } from '../../../context/user.context';
import { useCallback } from 'react';
import { 
    LoginNamesEnum,
    loginRules,
    initialValues
} from '../../../validators/login.validate';
import { 
    MenuKey, 
    NavigationContext 
} from '../../../context/navigation.context';
import { 
    sendEmailVerification,
    UserCredential,
    AuthError
} from 'firebase/auth';
import { VerifyEmailModal, VerifyEmailStatus } from '../verify-email-modal/verify-email-modal.component';

const formitems = [
    {  name: LoginNamesEnum.email, rules: loginRules[LoginNamesEnum.email], item: <Input prefix={<UserOutlined />} placeholder="E-mail" />},
    {  name: LoginNamesEnum.password, rules: loginRules[LoginNamesEnum.password], item: <Input prefix={<LockOutlined />} type="password" placeholder="password" />},
]

export interface IStateWithPathname {
    pathname: string;
}


const SignInItem = () => {
    const { setUserUid, refetchUser, currentUser } = useContext(UserContext)
    const { setCurrentMenuKey } = useContext(NavigationContext)
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ signinUser, setSigninUser] = useState<UserCredential["user"]>(null);
    const [ isSendverifyEmailOpen, setIsSendverifyEmailOpen] = useState<boolean>(false);
    const [ sendEmailLoading, setSendEmailLoading] = useState<boolean>(false);
    const [ sendEmailStatus, setSendEmailStatus] = useState<VerifyEmailStatus>('init');
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

    //check the current user
    useEffect(()=> {
        if(currentUser) {
            if(
                Object.prototype.toString.call(state) === '[object Object]' &&
                Object.prototype.hasOwnProperty.call(state, 'pathname')
            ) {
                navigate(`${(state as IStateWithPathname).pathname}`,{replace: true});
            } else {
                navigate(`/`);
            }
        }
    },[currentUser, state, navigate])


    //
    const sendEmailVerificationHandle = useCallback(() =>{
        setSendEmailLoading(true);
        sendEmailVerification(signinUser).then(()=>{    
            setSendEmailStatus('success');
            setTimeout(() => {
                setIsSendverifyEmailOpen(false);
                setSendEmailLoading(false);
                navigate(`/`);
            }, 3000);
        })
        .catch((error:AuthError) =>{
            setSendEmailStatus('error');
            setTimeout(() => {
                setSendEmailLoading(false);
                setIsSendverifyEmailOpen(false);
            }, 2000);
            
        });
    },[signinUser, navigate]);

    const closeEmailVerificationMadalHandle = () => {
        setIsSendverifyEmailOpen(false);
    }

    const onFinish = useCallback(async(values: any) => {
        setButtonDisabled(true);
        console.log('Success:', values);
        const { email, password} = values;
        await signInWithWithEmailAndPasswordMethod(email, password)
        .then(async(credential: UserCredential)=>{
            const { user } = credential;
            console.log("sing in:", user.emailVerified);
            if(user.emailVerified){
                setUserUid(user.uid);
            } else {
                setIsSendverifyEmailOpen(true);
                setSigninUser(user);
            }
        })
        .catch((error:AuthError) => {
            message.error(error.code);
        });
        setButtonDisabled(false);
      },[setUserUid]);
    
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

                {
                    <VerifyEmailModal
                        sendEmailVerification = {sendEmailVerificationHandle}
                        closeEmailVerificationMadal = {closeEmailVerificationMadalHandle}
                        sendEmailLoading = {sendEmailLoading}
                        sendStatus = {sendEmailStatus}
                        open = {isSendverifyEmailOpen}

                    />
                }

        </SignInItemContainer>
    )
}

export default SignInItem;