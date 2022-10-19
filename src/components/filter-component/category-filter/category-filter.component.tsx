import {
    FC,
    useCallback
} from 'react';
import { 
    CategoryFilterContainer,
    CategorySelect,
    TitleContainer,
    CategoryOption
} from './category-filter.styles';
import {
    Row,
    Col
} from 'antd';
import { taskCategories, EventCategory } from '../../../interfaces/task.interface';


interface ICategoryFilterProps {
    value: EventCategory;
    onChange: (value: EventCategory) => void;
    title: boolean;
}

export const CategoryFilter:FC<ICategoryFilterProps> = ({
    value,
    onChange,
    title
}) => {
    const onChangeHandle = useCallback((value: EventCategory)=>{
        onChange(value);
    },[onChange])
    return (
        <CategoryFilterContainer>
            {title && <TitleContainer>Category</TitleContainer>}
            <Row>
                <Col span={24}>
                    <CategorySelect
                        defaultValue={value}
                        onChange={onChangeHandle}
                    >
                        {
                            taskCategories.map((c, index) => <CategoryOption key = {index} value={c}>{c}</CategoryOption>)
                        }
                    </CategorySelect>
                    
                </Col>
            </Row>
        </CategoryFilterContainer>
    )
}