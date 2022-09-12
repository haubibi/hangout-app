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
    const { setCurrentUser } = useContext(UserContext);
    const [ detail, setDetail] = useState<Record<string, any>>();
    const navigate = useNavigate();

    //set initial values when component mounted
    useEffect(()=> {
        setDetail(initialValues);
    },[])




    const onFinish = async(values: any)=>{
        console.log('Success:', values);
        // console.log(data)
        const { email,password, displayName, sex} = values;


        const additionalInfo = {
            displayName,
            sex,
            avatarImg: null,
            friendsList: []
        }
        createAuthUserWithEmailAndPassword(email, password, additionalInfo).then((user)=>{
            setCurrentUser(user);
            console.log(user)
            navigate(`/`);
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