import { 
    useEffect,
    useContext,
} from 'react';
import {
    ResetPassWordFormContainer,
} from './reset-password-form.styles';
import { ResetPassWordItem } from '../../components/log-component/reset-password/reset-password.component';
import { NavigationContext, MenuKey } from '../../context/navigation.context';

const ResetPassWordForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.RESETPASSWORD);
    },[setCurrentMenuKey])

    return (
        <ResetPassWordFormContainer>
            <ResetPassWordItem />
        </ResetPassWordFormContainer>
    )
}

export default ResetPassWordForm;