import React, {
    useContext,
    useState,
    useEffect
} from 'react';
import { 
    Button, 
    Form, 
    Input,
    message
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { SignupItemContainer } from './sign-up-item.styles';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../context/user.context';
import { NavigationContext, MenuKey } from '../../context/navigation.context';
import { useMutation } from '@apollo/client';
import { ADDUSER } from '../../utils/graphql/mutation.utils';
import { IUserInput, ISignUpAdditionsInfo } from '../../interfaces/user.interface';
import { 
    initialValues,
    signupRules,
    SignUpNamesEnum
 } from '../../validators/signup.validate';

 const formitems = [
    { label: 'Displayname', name: SignUpNamesEnum.displayname, rules: signupRules[SignUpNamesEnum.displayname],item: <Input placeholder='display name'/>},
    { label: 'E-mail', name: SignUpNamesEnum.email, rules: signupRules[SignUpNamesEnum.email], item: <Input placeholder='e-mail address'/>},
    { label: 'Password', name: SignUpNamesEnum.password, rules: signupRules[SignUpNamesEnum.password], item: <Input.Password placeholder='password'/>},
    { label: 'Confirm Password', name: SignUpNamesEnum.confirm, rules: signupRules[SignUpNamesEnum.confirm],item: <Input.Password  placeholder='confirm password'/>},
]


const SignUpItem = () => {
    const { setUserUid } = useContext(UserContext);
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const [ addUser ] = useMutation(ADDUSER);
    const [ detail, setDetail] = useState<Record<string, any>>();
    const navigate = useNavigate();

    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[])




    const onFinish = async(values: any)=>{
        console.log('Success:', values);
        const { email,password, displayName} = values;
        const additionalInfo: ISignUpAdditionsInfo = {
            displayName
        }
        //sign up with email and password
        createAuthUserWithEmailAndPassword(email, password, additionalInfo).then((userInput: IUserInput)=>{
            //add user to database
            addUser({
                variables:{userInput} 
            }).then(()=>{
                //set current user and navigate to home page
                const {uid} = userInput;
                setUserUid(uid);
                setCurrentMenuKey(MenuKey.HOME)
                navigate(`/`);
            });
            
        }).catch((error)=>{
            message.error(error);
        });

        // }
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <SignupItemContainer>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues = {detail}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                {
                    formitems.map(({item,rules,...otherProps}, index) => <Form.Item key = {index} {...otherProps} rules = {rules}>{item as JSX.Element}</Form.Item>)
                            
                }
                <Form.Item label = "" wrapperCol={{sm: {span: 4, offset: 14}}}>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </SignupItemContainer>
    )
}

export default SignUpItem;