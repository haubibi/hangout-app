import { 
    Row, 
    Col, 
    Select 
} from 'antd';
import { FC } from 'react';
import { DistanceRange } from '../../../interfaces/task.interface';
import { 
    DistanceFilterContainer,
    TitleContainer,
    SelectContainer,
 } from './distance-filter.styles';

interface DistanceFilterProps {
    onChange: (value: DistanceRange) => void;
    value: DistanceRange;
}

const { Option } = Select;
const distanceOptions = [1, 2, 5, 10, 15, 30, 50, 100];




export const DistanceFilter:FC<DistanceFilterProps> = ({
    onChange,
    value
}) => {

    const onSelectChange = (value: number) => {
        onChange([0, value]);
    }
    return(
        <DistanceFilterContainer>
            <TitleContainer>Distance</TitleContainer>
            <Row>
                <Col span={24}>
                    <SelectContainer 
                        bordered 
                        defaultValue={`< ${value[1]} Km`}
                        onChange = { onSelectChange }
                    >
                        {
                            distanceOptions.map((d, index)=>{
                                return <Option key = {index} value= {d}>{`< ${d} Km`}</Option>
                            })
                        }
                    </SelectContainer>
                </Col>
            </Row>
            
        </DistanceFilterContainer>
    )
}