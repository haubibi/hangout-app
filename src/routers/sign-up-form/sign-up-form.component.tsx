import React from "react";
import { 
    Row, 
    Col
} from "antd";
import SignUpItem from "../../components/sign-up-item/sign-up-item.component";
import SignInItem from "../../components/sign-in-item/sign-in-item.component";
import { SignupFormContainer, SignupFormRow, SignupFormCol } from './sign-up-form.styles'
export const signInFormColSideLeftLayout = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6
};
export const signInFormColSideRightLayout = {
    xs: 4,
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
};
export const signInFormColSideMiddleLayout = {
    xs: 18,
    sm: 16,
    md: 13,
    lg: 12,
    xl: 10
};
const SignUpForm = () => {
    return (
        <SignupFormContainer >
            <SignupFormRow>
                <Col {...signInFormColSideLeftLayout} ></Col>
                <SignupFormCol {...signInFormColSideMiddleLayout}>
                    <SignUpItem />
                </SignupFormCol>
                <Col {...signInFormColSideRightLayout}></Col>
            </SignupFormRow>
            {/* <SignInItem /> */}
        </SignupFormContainer>
    )
}

export default SignUpForm;