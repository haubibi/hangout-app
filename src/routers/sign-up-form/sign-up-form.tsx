import { Fragment } from "react";
import { Divider,Row, Col } from "antd";
import SignUpItem from "../../components/sign-up-item/sign-up-item.component";
import SignInItem from "../../components/sign-in-item/sign-in-item.component";
import { SignupFormContainer } from './sign-up-form.styles'
import React from "react";
const SignUpForm = () => {
    return (
        <SignupFormContainer>
            <SignUpItem />
            <SignInItem />
        </SignupFormContainer>
    )
}

export default SignUpForm;