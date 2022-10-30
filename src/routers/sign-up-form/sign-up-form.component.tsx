import { 
    useEffect,
    useContext,
} from 'react';
import SignUpItem from "../../components/log-component/sign-up-item/sign-up-item.component";
import { 
    SignupFormContainer
} from './sign-up-form.styles';
import { NavigationContext, MenuKey } from '../../context/navigation.context';

const SignUpForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.SIGNUP);
    },[setCurrentMenuKey])

    return (
        <SignupFormContainer>
            <SignUpItem />
        </SignupFormContainer>
    )
}

export default SignUpForm;