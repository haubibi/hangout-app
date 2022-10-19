import { PlusOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { 
  Tag, 
  Tooltip 
} from 'antd';
import { 
  FC, 
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { 
  TagCon, 
  InputCon, 
  TagItem 
} from './form-tag.styles';
import { maxTagLength } from '../../../validators/taskForm.validate';

interface IFormTagprops {
    value?: string[];
    onChange?: (e: string[]) => void;
    maxTagsNumber: number;
}

export const FormTag: FC<IFormTagprops> = ({
    value,
    onChange,
    maxTagsNumber
}) => {
    const [tags, setTags] = useState<string[]>(value || []);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);
    const editInputRef = useRef<InputRef>(null);
  
    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);
  
    useEffect(() => {
      editInputRef.current?.focus();
    }, [inputValue]);
  

    useEffect(()=>{
        if(onChange){
            onChange(tags);
        }
    },[tags, onChange])

    const handleClose = (removedTag: string) => {
      const newTags = tags.filter(tag => tag !== removedTag);
      setTags(newTags);
    };
  
    const showInput = () => {
      setInputVisible(true);
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
  
    const handleInputConfirm = () => {
      if (inputValue && inputValue.length <= maxTagLength && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
  
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditInputValue(e.target.value);
    };
  
    const handleEditInputConfirm = () => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;
      setTags(newTags);
      setEditInputIndex(-1);
      setInputValue('');
    };
  
    return (
        <TagCon>
            {tags.map((tag, index) => {
            if (editInputIndex === index) {
                return (
                <InputCon
                    ref={editInputRef}
                    key={tag}
                    size="large"
                    className="tag-input"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                />
                );
            }
    
            const isLongTag = tag.length > 10;
    
            const tagElem = (
                <TagItem
                    key={tag}
                    closable = {true}
                    onClose={() => handleClose(tag)}
                >
                <span
                    onDoubleClick={e => {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                    }}
                >
                    {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                </span>
                </TagItem>
            );
            return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
            ) : (
                tagElem
            );
            })}
            {inputVisible && (
            <InputCon
                ref={inputRef}
                type="text"
                size="small"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
                maxLength = {maxTagLength}
            />
            )}
            {!inputVisible && ( tags.length < maxTagsNumber )&& (
            <Tag className="site-tag-plus" onClick={showInput}>
                <PlusOutlined /> New Tag
            </Tag>
            )}
        </TagCon>
    );
  };
  