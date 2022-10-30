import { 
    useEffect,
    useContext,
} from 'react';
import {
    ForgetPassWordFormContainer
} from './forget-password-form.styles';
import { ForgetPassWordItem } from '../../components/log-component/forget-password/forget-password.component';
import { NavigationContext, MenuKey } from '../../context/navigation.context';


const ForgetPassWordForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.FORGETPASSWORD);
    },[setCurrentMenuKey])

    return (
        <ForgetPassWordFormContainer>
            <ForgetPassWordItem />
        </ForgetPassWordFormContainer>
    )
}

export default ForgetPassWordForm;