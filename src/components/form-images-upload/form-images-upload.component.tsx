import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState, HTMLAttributes,FC, useEffect } from 'react';
import { FormImagesUploadContainer} from './form-images-upload.styles'
import { IImageObjWithRefPath, IImageObjWithUrl } from '../../utils/images/images.utils';
import { deleteImage } from '../../utils/firebase/firebase.utils';
import { ImagesTypeName } from '../../utils/images/images.utils';
import { useMemo } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Form } from 'antd';

export interface IFormImagesUploadProps{
  maxImageLength: number;
  name: string;
  label: string;
  showImages: IImageObjWithUrl[];
}


export const FormImagesUpload: FC<IFormImagesUploadProps> = ({
    // parentRefPath,
    maxImageLength = 5,
    name = 'showImages',
    label = 'Display images',
    showImages,
    // defaultFileList = []
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>(showImages);


  // useEffect(()=>)
  const normalFile = (e: any) => {
    console.log(e)
    if (Array.isArray(e)) {
      return e;
    }
   return e && e.fileList;
  };

  const beforeUpload = (file: RcFile, Filelist: RcFile[]) => {
    console.log(Filelist)
    return false;
  }

  const handleCancel = () => {
    setPreviewOpen(false)
  };

  const handlePreview = async (file: UploadFile) => {
    console.log(file)
  };
  // customUploadImage('users', 'sdf', 'avatar')
  const handleChange: UploadProps['onChange'] = ({ fileList, file}) => {
    console.log(fileList)
    setFileList(fileList);
  }

  const handleRemove:UploadProps['onRemove'] = (file) => {
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    // <FormImagesUploadContainer>
    <Form.Item 
          label= { label}
          name = { name }
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          getValueFromEvent = {normalFile}
    >
        <FormImagesUploadContainer
          listType="picture-card"
          fileList={fileList}
          beforeUpload = {beforeUpload}
          onPreview={handlePreview}
          onChange={handleChange}
          onRemove = {handleRemove}
          // customRequest = {customUploadImage('users', 'sdf', 'avatar')}
        >
          {fileList.length >= maxImageLength ? null : uploadButton}
        </FormImagesUploadContainer>
    </Form.Item> 
    // </FormImagesUploadContainer>
    );
  };
  // <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
  //   <img alt="example" style={{ width: '100%' }} src={previewImage} />
  // </Modal>