import { 
  PlusOutlined,
  UserAddOutlined
 } from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState,FC, } from 'react';
import { FormImagesUploadContainer} from './form-images-upload.styles'
import { 
  IImageObjWithUrl, 
  maxUploadImageSize 
} from '../../../interfaces/images.interface';
import { Form, Modal, message} from 'antd';
import { getBase64 } from '../../../utils/usefulFunctions/imageToBase64';

export interface ColInterface {
    span: number;
}

export interface IFormImagesUploadProps{
  maxImageLength: number;
  name: string;
  label?: string;
  showImages: IImageObjWithUrl[];
  type?: string; //avatar image
  labelCol?: ColInterface;
  wapperCol?: ColInterface;

}


export const FormImagesUpload: FC<IFormImagesUploadProps> = ({
    maxImageLength = 5,
    name = 'showImages',
    label = 'Display images',
    showImages,
    type = 'image',
    labelCol={ span: 24 },
    wapperCol={ span: 24},
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isJpgOrPng, setIsJpgOrPng] = useState(true);
  const [sizeIsValid, setSizeIsValid] = useState(true);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(showImages || []);


  // useEffect(()=>)
  const normalFile = (e: any) => {
    // console.log(e)
    if (Array.isArray(e)) {
      return e;
    }
   return e && e.fileList;
  };

  const beforeUpload = (file: RcFile, Filelist: RcFile[]) => {
    // console.log(Filelist)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    setIsJpgOrPng(true);
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      setIsJpgOrPng(false);
  }


    
    setSizeIsValid(true);
    const isLimit = file.size / 1024 / 1024 < maxUploadImageSize;
    if (!isLimit) {
      message.error(`Image must smaller than ${maxUploadImageSize}MB!`);
      setSizeIsValid(false);
    }
    return false;
  }

  const handleCancel = () => {
    setPreviewOpen(false)
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  // customUploadImage('users', 'sdf', 'avatar')
  const handleChange: UploadProps['onChange'] = ({ fileList, file}) => {
    console.log(fileList, isJpgOrPng, sizeIsValid)
    if(isJpgOrPng && sizeIsValid){
      setFileList(fileList);
    }
  }

  const handleRemove:UploadProps['onRemove'] = (file) => {
  }

  const uploadButton = () => {
    const iconStyle = {
      fontSize: '30px'
    };
    const icon = type === 'image'? <PlusOutlined style = {iconStyle}/>: <UserAddOutlined style = {iconStyle} />
      return icon;
  };


  return (
    <>
        <Form.Item 
              label= { label}
              name = { name }
              labelCol={labelCol}
              wrapperCol={wapperCol}
              getValueFromEvent = {normalFile}
        >
            <FormImagesUploadContainer
              listType="picture-card"
              fileList={fileList}
              beforeUpload = {beforeUpload}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove = {handleRemove}
            >
          
              {fileList.length >= maxImageLength ? null : uploadButton()}
            </FormImagesUploadContainer>
        </Form.Item> 
        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>  
    </>
    );
  };
