import React from "react";
import { 
    Col
} from "antd";
import SignInItem from "../../components/sign-in-item/sign-in-item.component";
import { SigninFormContainer, SigninFormRow, SigninFormCol } from './sign-in-form.styles'
export const signInFormColSideLeftLayout = {
    xs: 4,
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
};
export const signInFormColSideRightLayout = {
    xs: 4,
    sm: 5,
    md: 6,
    lg: 7,
    xl: 8
};
export const signInFormColSideMiddleLayout = {
    xs: 16,
    sm: 14,
    md: 12,
    lg: 10,
    xl: 8
};
const SignInForm = () => {
    return (
        <SigninFormContainer >
            <SigninFormRow>
                <Col {...signInFormColSideLeftLayout} ></Col>
                <SigninFormCol {...signInFormColSideMiddleLayout}>
                    <SignInItem />
                </SigninFormCol>
                <Col {...signInFormColSideRightLayout}></Col>
            </SigninFormRow>
        </SigninFormContainer>
    )
}

export default SignInForm;