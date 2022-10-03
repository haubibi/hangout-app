import { 
    useEffect,
    useContext,
} from 'react';
import {
    ForgetPassWordFormContainer,
    ForgetPassWordFormRow,
    ForgetPassWordFormCol,
} from './forget-password-form.styles';
import { ForgetPassWordItem } from '../../components/log-component/forget-password/forget-password.component';
import { NavigationContext, MenuKey } from '../../context/navigation.context';

export const forgetPassWordFormCol = {
    xs: 16,
    sm: 14,
    md: 12,
    lg: 10,
    xl: 8
};
const ForgetPassWordForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.FORGETPASSWORD);
    },[setCurrentMenuKey])

    return (
        <ForgetPassWordFormContainer>
            <ForgetPassWordFormRow>
                <ForgetPassWordFormCol {...forgetPassWordFormCol}>
                    <ForgetPassWordItem />
                </ForgetPassWordFormCol>
            </ForgetPassWordFormRow>
        </ForgetPassWordFormContainer>
    )
}

export default ForgetPassWordForm;