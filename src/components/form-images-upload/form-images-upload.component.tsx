import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState, HTMLAttributes,FC, useEffect } from 'react';
import { FormImagesUploadContainer} from './form-images-upload.styles'
import { customUploadImage } from '../../utils/firebase/firebase.utils';
import { IImageObj } from '../../utils/images/images.utils'
import { deleteImage } from '../../utils/firebase/firebase.utils';
import { ImagesTypeName } from '../../utils/images/images.utils';
import { useMemo } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Form } from 'antd';

interface IFormImagesUploadProps extends HTMLAttributes<HTMLDivElement>{
  maxImageLength: number;
}


export const FormImagesUpload: FC<IFormImagesUploadProps> = ({
    // parentRefPath,
    maxImageLength = 5,
    // defaultFileList = []
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      name: "inbetween.png",
      // refPath: "images/tasks/taskTest111/displayInTask/rc-upload-1662591043673-6",
      uid: "rc-upload-1662591043673-6",
      url: "https://firebasestorage.googleapis.com/v0/b/hang-out-213d4.appspot.com/o/images%2Ftasks%2FtaskTest111%2FdisplayInTask%2Frc-upload-1662592247661-6?alt=media&token=5334240d-e248-49bb-89d2-3570d24ebeea"

    }
  ]);


  // useEffect(()=>)

  const getDisPlayImages = (e: any) => {
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
          label="Display images" 
          name = "fileList"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
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