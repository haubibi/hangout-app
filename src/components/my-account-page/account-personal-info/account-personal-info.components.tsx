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
    FormSubmitButton
} from './account-personal-info.styles';
import { FormImagesUpload } from '../../form-component/form-images-upload/form-images-upload.component';
import { 
    useContext,
    useState,
} from 'react';
import { 
    SignUpNamesEnum
} from '../../../validators/signup.validate';

import { UserContext } from '../../../context/user.context'; 
import { getImageObjWithUrl } from '../../../utils/user/user.utils';
import { IPersonalInfoInput } from '../../../interfaces/personal-infor.interface';
import { 
    Spin,
    RadioChangeEvent 
} from 'antd';
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


const sexRadioGroupOptions = [
    {label: 'male', value: UserSexEnum.MALE},
    {label: 'female', value: UserSexEnum.FEMALE },
]


export const AccountPersonalInfo = () => {
    const { currentUser } = useContext(UserContext);
    const [ detail, setDetail] = useState<Record<string, any>>();
    const avartImageWithUrl = currentUser.avatarImg? getImageObjWithUrl(currentUser.avatarImg): null;
    console.log(avartImageWithUrl)

    const onFinishFailed = ({ values, errorFields, outOfDate }: any) => {
        console.log('onFinishFailed:', values)
    }
   
    const onFinish = async (values: IPersonalInfoInput) => {
        // const {avatarImg, displayName, sex} = values;
        console.log(values);
        const { uid } = currentUser;
        let avatarImg: (IImageObjWithUrlAndRefPath | null) = currentUser.avatarImg;
        if(values.avatarImg.length > 0){
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
                    avatarImg= avatarImageArr[0] as IImageObjWithUrlAndRefPath;
                });
            });
        }
    }



    if(!currentUser) return <Spin />;
    return(
        <AccountPersonalInfoCon>
                Personal Info page
            <RowInfoCon >
                <ColInfoCon>
                <FormCon
                    name='taskform'
                    layout="horizontal"
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
                        <FormSubmitButton htmlType='submit'>Apply</FormSubmitButton>
                    </FormSubmitButtonItem>
                </FormCon>
                </ColInfoCon>
            </RowInfoCon>
                
        </AccountPersonalInfoCon>
    )
}