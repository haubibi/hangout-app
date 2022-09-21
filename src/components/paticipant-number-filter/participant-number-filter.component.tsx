import { 
    Row, 
    Col
} from 'antd';
import { 
    FC, 
    useState, 
    useEffect,
    useCallback
 } from 'react';
import { 
    ParticipantsFilterContainer,
    TitleContainer,
    InputNumberContainer,
    TextColContainer,
 } from './participant-number-filter.styles';
import { ParticipantsRange } from '../../interfaces/task.interface';

interface ParticipantsFilterProps {
    onChange: (value: ParticipantsRange) => void;
    value: ParticipantsRange;
}


export const ParticipantsFilter:FC<ParticipantsFilterProps> = ({
    onChange,
    value
}) => {
    const [smallValue, setSmallValue] = useState<number>(value[0]);
    const [largeValue, setLargeValue] = useState<number>(value[1]);


    useEffect(()=>{
        onChange([smallValue, largeValue]);
    },[smallValue, largeValue,onChange]);


    const smallValueOnChange = (value: number) => {
        setSmallValue(value);
    };

    const largeValueOnChange = (value: number) => {
        setLargeValue(value);
    };

   
    return(
        <ParticipantsFilterContainer>
            <TitleContainer>Participants Number</TitleContainer>
            <Row>
                <Col span={11}>
                    <InputNumberContainer 
                        defaultValue={value[0]}
                        onStep = {smallValueOnChange}
                        max = {largeValue}
                        min = {1}
                    />
                </Col>
                <TextColContainer span={2}> to </TextColContainer>
                <Col span={11}>
                    <InputNumberContainer 
                        defaultValue={value[1]}
                        onStep = {largeValueOnChange}
                        min = {smallValue}
                    />
                </Col>
            </Row>
            
        </ParticipantsFilterContainer>
    )
}