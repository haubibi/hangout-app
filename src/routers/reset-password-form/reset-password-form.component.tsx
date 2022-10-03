import { 
    useEffect,
    useContext,
} from 'react';
import {
    ResetPassWordFormContainer,
    ResetPassWordFormRow,
    ResetPassWordFormCol,
} from './reset-password-form.styles';
import { ResetPassWordItem } from '../../components/log-component/reset-password/reset-password.component';
import { NavigationContext, MenuKey } from '../../context/navigation.context';

export const resetPassWordFormCol = {
    xs: 16,
    sm: 14,
    md: 12,
    lg: 10,
    xl: 8
};
const ResetPassWordForm = () => {
    const { setCurrentMenuKey } = useContext(NavigationContext)
    useEffect(()=> {
        setCurrentMenuKey(MenuKey.RESETPASSWORD);
    },[setCurrentMenuKey])

    return (
        <ResetPassWordFormContainer>
            <ResetPassWordFormRow>
                <ResetPassWordFormCol {...resetPassWordFormCol}>
                    <ResetPassWordItem />
                </ResetPassWordFormCol>
            </ResetPassWordFormRow>
        </ResetPassWordFormContainer>
    )
}

export default ResetPassWordForm;