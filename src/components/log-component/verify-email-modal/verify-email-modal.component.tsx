import {FC} from 'react';
import { 
    VerifyEmailModalCon,
    EmailVerifySpan
 } from './verify-email-modal.styles';
export type VerifyEmailStatus = 'init' | 'success' | 'error';

interface IVerifyEmailModalProps {
    sendEmailVerification: ()=>void;
    closeEmailVerificationMadal: ()=>void;
    sendEmailLoading: boolean;
    sendStatus :VerifyEmailStatus;
    open:boolean;
}


const initialEmailModalText = `The e-mail address hasn't been verified, do you wan to resend the verification?`;
const emailSentSucessfullyModalText = `The message has been sent, please verify it in your e-mail, it will jump to home page after 3 seconds `;
const emailSentFailModalText = ` Something wrong happened, please try again!`;

export const VerifyEmailModal:FC<IVerifyEmailModalProps> = ({
    sendEmailVerification,
    closeEmailVerificationMadal,
    sendEmailLoading,
    sendStatus,
    open
}) => {
    console.log(sendStatus)
    return (
        <VerifyEmailModalCon
            title = ''
            onOk= { sendEmailVerification}
            onCancel = {closeEmailVerificationMadal}
            confirmLoading = {sendEmailLoading}
            open = {open}
        >           
            <EmailVerifySpan>
            {
                (() => {
                    switch (sendStatus) {
                        case "init":   return initialEmailModalText;
                        case "success": return emailSentSucessfullyModalText;
                        case "error":  return emailSentFailModalText;
                        default:      return null;
                    }
                })()
            }
            </EmailVerifySpan>
        </VerifyEmailModalCon>
    )
}