import {
    FC,
    useCallback
} from 'react';
import {
    Row,
    Col,
} from 'antd';
import type { RangePickerProps} from 'antd/es/date-picker';
import { getCurrentMoment } from '../../../utils/date/date.utils';
import { 
    DateRangeFilterContainer,
    TitleContainer,
    RangePickerContainer
} from './date-filter.styles';
import { DateRangeValueType } from '../../../interfaces/time.interface';



const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today
    const currentMoment = getCurrentMoment();
    return current && current.isBefore(currentMoment,'day');
  };


interface IDateRangeFilterProps {
    value: DateRangeValueType;
    onChange: (value: DateRangeValueType) => void;
}


export const DateRangeFilter:FC<IDateRangeFilterProps> = ({
    value,
    onChange
}) =>{
    
    const dateChangeHandle = useCallback((values: DateRangeValueType)=>{
        onChange(values);
    },[onChange]);

    return (
        <DateRangeFilterContainer>
            <TitleContainer>Date</TitleContainer>
            <Row>
                <Col span={24}>
                    <RangePickerContainer 
                        bordered
                        disabledDate={disabledDate}
                        onChange = { dateChangeHandle }
                        value = {value}
                    />
                    
                </Col>
            </Row>
        </DateRangeFilterContainer>
    );
}