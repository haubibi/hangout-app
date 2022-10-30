import React, {
    useContext,
    useState,
    useEffect,
    useCallback
} from 'react';
import { 
    Button, 
    Form, 
    Input,
    message
} from 'antd';
import { 
    useNavigate
 } from 'react-router-dom';
import { SignupItemContainer } from './sign-up-item.styles';
import { createAuthUserWithEmailAndPassword } from '../../../utils/firebase/firebase.utils';
import { UserContext } from '../../../context/user.context';
import { NavigationContext, MenuKey } from '../../../context/navigation.context';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../../utils/graphql/mutation.utils';
import { IUserInput, ISignUpAdditionsInfo } from '../../../interfaces/user.interface';
import { 
    initialValues,
    signupRules,
    SignUpNamesEnum
 } from '../../../validators/signup.validate';



const formitems = [
    { label: 'Display name', name: SignUpNamesEnum.displayname, rules: signupRules[SignUpNamesEnum.displayname],item: <Input placeholder='display name'/>},
    { label: 'E-mail', name: SignUpNamesEnum.email, rules: signupRules[SignUpNamesEnum.email], item: <Input placeholder='e-mail address'/>},
    { label: 'Password', name: SignUpNamesEnum.password, rules: signupRules[SignUpNamesEnum.password], item: <Input.Password placeholder='password'/>},
    { label: 'Confirm password', name: SignUpNamesEnum.confirm, rules: signupRules[SignUpNamesEnum.confirm],item: <Input.Password  placeholder='confirm password'/>},
]


const SignUpItem = () => {
    const { setUserUid } = useContext(UserContext);
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const [ addUser ] = useMutation(ADD_USER);
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ formDisabled, setFormDisabled] = useState<boolean>(false);
    const navigate = useNavigate();
    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[]);

    //set the key of menu
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.SIGNUP)
    },[setCurrentMenuKey])



    const onFinish = useCallback(async(values: any)=>{
        setFormDisabled(true);
        // console.log('Success:', values);
        const { email,password, displayName} = values;
        const additionalInfo: ISignUpAdditionsInfo = {
            displayName
        }
        //sign up with email and password
        createAuthUserWithEmailAndPassword(email, password, additionalInfo).then(async (userInfo: (IUserInput & {emailVerified: boolean}))=>{
            const {emailVerified, ...otherProps} =userInfo;
            // console.log('emailVerified:', userInfo.emailVerified)
            // console.log('userInfo:', userInfo)
            // console.log('otherProps:', otherProps)
            //add user to database
            await addUser({
                variables:{userInput: otherProps} 
            }).then(()=>{
                //check if the email is verified
                if(emailVerified){
                    const {uid} = userInfo;
                    setUserUid(uid);
                } else {
                    message.info(`Please check the virification in your e-mail!`, 2);
                }
                setDetail(initialValues);
                navigate(`/`);
            });
            setFormDisabled(false);
        }).catch((error)=>{
            message.error(error);
        });
        setFormDisabled(false);
    },[addUser, navigate, setUserUid]);
    
    const onFinishFailed = (errorInfo: any) => {
        // console.log('Failed:', errorInfo);
      };
    return(
        <SignupItemContainer>
            <Form
                layout="vertical"    
                colon = {false}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues = {detail}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled = {formDisabled}
            >

                {
                    formitems.map(({item,rules,...otherProps}, index) => <Form.Item key = {index} {...otherProps} rules = {rules}>{item as JSX.Element}</Form.Item>)
                            
                }
                <Form.Item label = "" wrapperCol={{span: 24}}>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </SignupItemContainer>
    )
}

export default SignUpItem;