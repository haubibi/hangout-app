import { message} from 'antd';
import type { RcFile } from 'antd/es/upload/interface';



export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export const beforeImageUpload = (file: RcFile, maxFileSize: number) => {
    return (
        (file: RcFile) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
              message.error('You can only upload JPG/PNG file!');
            }
            const isLt2M = file.size / 1024 / 1024 < maxFileSize;
            if (!isLt2M) {
              message.error(`Image must smaller than ${maxFileSize}MB!`);
            }
            return false;
            // return isJpgOrPng && isLt2M;
          }
    );
}
