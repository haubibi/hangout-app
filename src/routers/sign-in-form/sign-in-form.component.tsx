import { 
    useEffect,
    useContext,
} from 'react';
import SignInItem from "../../components/log-component/sign-in-item/sign-in-item.component";
import { 
    SigninFormContainer
} from './sign-in-form.styles';
import { NavigationContext, MenuKey } from '../../context/navigation.context';


const SignInForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.LOGIN);
    },[setCurrentMenuKey])

    return (
        <SigninFormContainer>
            <SignInItem />
        </SigninFormContainer>
    )
}

export default SignInForm;