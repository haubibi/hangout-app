import { 
    useEffect,
    useContext,
} from 'react';
import SignInItem from "../../components/log-component/sign-in-item/sign-in-item.component";
import { 
    SigninFormContainer, 
    SigninFormRow, 
    SigninFormCol 
} from './sign-in-form.styles';
import { NavigationContext, MenuKey } from '../../context/navigation.context';


export const signInFormCol = {
    xs: 16,
    sm: 14,
    md: 12,
    lg: 10,
    xl: 8
};
const SignInForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.LOGIN);
    },[setCurrentMenuKey])

    return (
        <SigninFormContainer >
            <SigninFormRow>
                <SigninFormCol {...signInFormCol}>
                    <SignInItem />
                </SigninFormCol>
            </SigninFormRow>
        </SigninFormContainer>
    )
}

export default SignInForm;