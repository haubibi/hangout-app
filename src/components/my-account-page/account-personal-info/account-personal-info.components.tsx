import { 
    AccountPersonalInfoCon,
    ColInfoCon,
    RowInfoCon,
    FormCon,
    FormSexItem,
    FormSexRadioGroup,
    FormDisplayNameItem,
    FormDisplayNameInput,
    FormSubmitButtonItem,
    FormSubmitButton,
    FormDescriptionTextArea,
    DescriptionTextItem
} from './account-personal-info.styles';
import { FormImagesUpload } from '../../form-component/form-images-upload/form-images-upload.component';
import { 
    useContext,
    useState,
    useEffect,
} from 'react';
import { 
    SignUpNamesEnum
} from '../../../validators/signup.validate';
import { NavigationContext, MyAccountMenuKey } from '../../../context/navigation.context';
import { UserContext } from '../../../context/user.context'; 
import { getImageObjWithUrl } from '../../../utils/images/images.utils';
import { IPersonalInfoInput } from '../../../interfaces/user.interface';
import { 
    Spin,
    message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { UserSexEnum } from '../../../interfaces/user.interface';
import { personalInfoRules } from '../../../validators/user-information.validator';
import { 
    updateImages, 
    getImagesWithRefPath,
    getImagesWithUrlAndRefPath,
} from '../../../utils/images/images.utils';
import { 
    ImagesTypeName, 
    UsermagesTypeName,
    IImageObjWithUrlAndRefPath
} from '../../../interfaces/images.interface';
import { 
    useNavigate,
    useLocation
 } from 'react-router-dom';
import { UPDATE_USER_INFO } from '../../../utils/graphql/mutation.utils';
import { useMutation } from '@apollo/client';
import { transformImageToWithoutRefPath } from '../../../utils/images/images.utils';

const sexRadioGroupOptions = [
    {label: 'male', value: UserSexEnum.MALE},
    {label: 'female', value: UserSexEnum.FEMALE },
    {label: 'others', value: UserSexEnum.OTHERS },
]


export const AccountPersonalInfo = () => {
    const navigate = useNavigate();
    const [ form ] = useForm();
    const {pathname} = useLocation();
    const { currentUser, refetchUser } = useContext(UserContext);
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const [ detail, setDetail] = useState<Record<string, any>>();
    const [ updateButtonDisabled, setUpdateButtonDisabled] = useState<boolean>(false);
    const [ updateUserInfo ] = useMutation(UPDATE_USER_INFO)
    const avartImageWithUrl = currentUser?.avatarImg? getImageObjWithUrl(currentUser.avatarImg): null;

    // set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MyAccountMenuKey.PERSONNALINFO);
    },[setCurrentMenuKey]);

    //check the user
    useEffect(()=> {
        if (!currentUser) {
            message.info(`Please log in first!`);
            navigate(`/logIn`,{state:{pathname}});
        } else {
            message.destroy();
        }
    },[currentUser, navigate, pathname]);


    //set the default detail
    useEffect(()=>{
        if(currentUser) {
            const {avatarImg, displayName, description, sex} = currentUser;
            const cAvatarImg = avatarImg? transformImageToWithoutRefPath([avatarImg])[0]: null;
            setDetail({
                avatarImg: cAvatarImg,
                displayName,
                description,
                sex
            });
        }
    },[currentUser]);
    //set detail in form
    useEffect(()=>{
        form.setFieldsValue(detail);
    },[detail, form])


    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        // console.log('onFinishFailed:', values)
    }
   
    const onFinish = async (values: IPersonalInfoInput) => {
        // const {avatarImg, displayName, sex} = values;
        console.log("values:", values);
        setUpdateButtonDisabled(true);


        const { uid } = currentUser;
        let newAvatarImg: (IImageObjWithUrlAndRefPath | null) = currentUser.avatarImg;
        if(
            values.avatarImg&&
            values.avatarImg.length > 0
        ){
            await updateImages(
                ImagesTypeName.USERS,
                uid,
                UsermagesTypeName.AVATAR,
                (currentUser.avatarImg? [currentUser.avatarImg]: []),
                values.avatarImg
            ).then(async()=>{
                const imagesWithRef = getImagesWithRefPath(ImagesTypeName.USERS, uid, UsermagesTypeName.AVATAR, values.avatarImg);
                // console.log(imagesWithRef)
                await getImagesWithUrlAndRefPath(imagesWithRef).then((avatarImageArr)=>{      
                    // console.log( avatarImageArr )              
                    newAvatarImg= avatarImageArr[0] as IImageObjWithUrlAndRefPath;
                });
            }).catch((error)=>{
                message.error(error.toString(), 3);
                setUpdateButtonDisabled(false);
            });
        }

        const {avatarImg, ...otherProps} = values;
        await updateUserInfo({
            variables: {
                userUid: uid,
                userInput: {
                    avatarImg: newAvatarImg,
                    ...otherProps
                }
            }
        }).then(()=>{
            refetchUser({
                uid: currentUser?.uid
            });
            message.success(`You have update the personal information successfully!`);
        }).catch(error => message.error(error, 3))
        

        setUpdateButtonDisabled(false);
    }

    return(
        <AccountPersonalInfoCon>
                Personal Info page
            <RowInfoCon >
                <ColInfoCon>
                <FormCon
                    form = {form}
                    disabled = {updateButtonDisabled}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed = {onFinishFailed}
                    initialValues = {detail}
                    colon = {false}
                >
                    <FormImagesUpload 
                         maxImageLength = {1}
                         name = 'avatarImg'
                         label = ''
                         showImages = {avartImageWithUrl?[avartImageWithUrl]:[]}
                         type = 'avatar'
                    />

                    <FormDisplayNameItem
                        name = "displayName"
                        label = "Display Name"
                        rules = {personalInfoRules[SignUpNamesEnum.displayname]}
                    >
                        <FormDisplayNameInput />
                    </FormDisplayNameItem>   
                    <FormDescriptionTextArea
                        name = "description"
                        label = "Description"
                        rules = {personalInfoRules[SignUpNamesEnum.description]}
                    >
                        <DescriptionTextItem />
                    </FormDescriptionTextArea>   
                    <FormSexItem
                        name = "sex"
                        label = "Sex"
                        rules = {personalInfoRules[SignUpNamesEnum.displayname]}
                        
                    >
                        <FormSexRadioGroup
                            options={sexRadioGroupOptions}
                        />
                    </FormSexItem>
                    <FormSubmitButtonItem>
                        <FormSubmitButton htmlType='submit' type='primary'>Update</FormSubmitButton>
                    </FormSubmitButtonItem>
                </FormCon>
                </ColInfoCon>
            </RowInfoCon>
                
        </AccountPersonalInfoCon>
    )
}