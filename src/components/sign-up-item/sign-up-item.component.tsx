import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { SignupItemContainer } from './sign-up-item.styles';

import { useQuery } from '@apollo/client';
import { GETALLMAILS } from '../../utils/graphql/query.utils'
import { IAllEmails } from '../../utils/interfaces/user.interface';
import { useContext } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../context/user.context';
import { mathString } from '../../utils/usefulFunctions/limit.utils';

const SignUpItem = () => {
    const {data} = useQuery(GETALLMAILS);
    const {setAdditionalInfo} = useContext(UserContext);

    const onFinish = async(values: any)=>{
        console.log('Success:', values);
        // console.log(data)
        const { email,password, displayName } = values;
        const ifEmailRepeated = await data.getAllEmails.map((emailObj: IAllEmails)=> emailObj.email).findIndex((mail: string)=>mail === email);
        if(ifEmailRepeated !== -1){
            alert('the email has been signed!');
        } else {
            if(mathString(displayName)){
                setAdditionalInfo({
                    displayName
                });
            }
            createAuthUserWithEmailAndPassword(email, password);

        }
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return(
        <SignupItemContainer>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Displayname"
                    name="displayname"
                    rules={[{ required: true, message: 'Please input your displayname!' }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail'
                        },
                        { 
                            required: true, 
                            message: 'Please input your E-mail!' 
                        }
                    ]}
                >
                <Input/>
                </Form.Item>
                
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 13, span: 4 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 13, span: 4 }}>
                    <Button type="primary" htmlType="submit">
                        Sign up
                    </Button>
                </Form.Item>
            </Form>
        </SignupItemContainer>
    )
}

export default SignUpItem;