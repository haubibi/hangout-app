import { 
    useEffect,
    useContext,
} from 'react';
import SignUpItem from "../../components/log-component/sign-up-item/sign-up-item.component";
import { 
    SignupFormContainer, 
    SignupFormRow, 
    SignupFormCol 
} from './sign-up-form.styles';
import { NavigationContext, MenuKey } from '../../context/navigation.context';

export const signInFormCol = {
    xs: 18,
    sm: 16,
    md: 13,
    lg: 12,
    xl: 10
};
const SignUpForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.SIGNUP);
    },[setCurrentMenuKey])

    return (
        <SignupFormContainer>
            <SignupFormRow>
                <SignupFormCol {...signInFormCol}>
                    <SignUpItem />
                </SignupFormCol>
            </SignupFormRow>
        </SignupFormContainer>
    )
}

export default SignUpForm;