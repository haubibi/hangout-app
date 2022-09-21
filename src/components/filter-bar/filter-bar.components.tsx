import { DistanceFilter } from '../distance-filter/distance-filter.component';
import { ParticipantsFilter } from '../paticipant-number-filter/participant-number-filter.component';
import { 
    ParticipantsRange, 
    DistanceRange, 
    IFilterTasks,
} from '../../interfaces/task.interface';
import { 
    useState, 
    useCallback,
    useEffect,
    FC
} from 'react';
import {
    RowContainer,
    ColContainer,
    SubmitButton
 } from './filter-bar.styles';
 import {
    FilterBarContainer
} from './filter-bar.styles';
import { SearchOutlined } from '@ant-design/icons';

interface FilterBarProps {
    value: IFilterTasks;
    onChange: (value: IFilterTasks)=> void;
}

const dafaultParticipantsRange: ParticipantsRange = [0,5];

export const FilterBar:FC<FilterBarProps> = ({
    value,
    onChange
}) => {
    const [distance, setDistance] = useState<DistanceRange>(value.distanceRange);
    const [participantsNumber, setParticipantsNumber] = useState<ParticipantsRange>(value.participantsRange);

    // useEffect(()=>{
    //     const filterValue:IFilterTasks = {
    //         distanceRange: distance,
    //         participantsRange: participantsNumber
    //     };
    //     onChange(filterValue);
    // },[distance, participantsNumber, onChange]);

    const onDistanceChange = useCallback((value: DistanceRange)=>{
        setDistance(value);
    },[setDistance]);
    const onparticipantsNumberChange = useCallback((value: ParticipantsRange)=>{
        setParticipantsNumber(value);
    },[setParticipantsNumber]);

    const buttonOnClick = () => {
        const filterValue:IFilterTasks = {
            distanceRange: distance,
            participantsRange: participantsNumber
        };
        onChange(filterValue);
    }


    return (
        <FilterBarContainer>
            <RowContainer>
                <ColContainer span={24}>
                    <DistanceFilter 
                        onChange= {onDistanceChange}
                        value = {distance}
                    />
                </ColContainer>
            </RowContainer>
            <RowContainer>
                <ColContainer span={24}>
                    <ParticipantsFilter
                        onChange= {onparticipantsNumberChange}
                        value = {participantsNumber}
                    />
                </ColContainer>
            </RowContainer>
            <RowContainer>
                <ColContainer span={24}>
                    <SubmitButton 
                        type="primary" 
                        shape="circle" 
                        size = "large"
                        onClick={buttonOnClick}
                        icon={<SearchOutlined />}
                    >

                    </SubmitButton>
                </ColContainer>
            </RowContainer>
        </FilterBarContainer>
    )
}