import { DistanceFilter } from '../distance-filter/distance-filter.component';
import { ParticipantsFilter } from '../paticipant-number-filter/participant-number-filter.component';
import { DateRangeFilter } from '../date-filter/date-filter.component';
import { CategoryFilter } from '../category-filter/category-filter.component';
import { 
    ParticipantsRange, 
    DistanceRange, 
    IFilterTasks,
} from '../../../interfaces/task.interface';
import { 
    useState, 
    useCallback,
    useEffect,
    FC,
} from 'react';
import {
    RowContainer,
    ColContainer,
 } from './filter-bar.styles';
import {
    FilterBarContainer
} from './filter-bar.styles';
import { DateRangeValueType } from '../../../interfaces/time.interface';
import { EventCategory } from '../../../interfaces/task.interface';


interface FilterBarProps {
    value: IFilterTasks;
    onChange: (value: IFilterTasks)=> void;
}

export const FilterBar:FC<FilterBarProps> = ({
    value,
    onChange
}) => {
    const [category, setCategory] = useState<EventCategory>(value.category);
    const [distance, setDistance] = useState<DistanceRange>(value.distanceRange);
    const [dateRange, setDateRange] = useState<DateRangeValueType>(value.dateRange);
    const [participantsNumber, setParticipantsNumber] = useState<ParticipantsRange>(value.participantsRange);
  

    useEffect(()=>{
        const filterValue:IFilterTasks = {
            distanceRange: distance,
            participantsRange: participantsNumber,
            dateRange: dateRange,
            category: category
        };
        onChange(filterValue);
    },[distance, participantsNumber, dateRange, onChange, category]);

    const onCategoryChange = useCallback((value: EventCategory)=>{
        setCategory(value);
    },[setCategory]);
    const onDistanceChange = useCallback((value: DistanceRange)=>{
        setDistance(value);
    },[setDistance]);

    const onDateRangeChange = useCallback((value: DateRangeValueType)=>{
        setDateRange(value);
    },[setDateRange]);

    const onparticipantsNumberChange = useCallback((value: ParticipantsRange)=>{
        setParticipantsNumber(value);
    },[setParticipantsNumber]);



    return (
        <FilterBarContainer>
            <RowContainer>
                <ColContainer span={24}>
                    <CategoryFilter
                        title
                        onChange= {onCategoryChange}
                        value = {category}
                    />
                </ColContainer>
            </RowContainer>
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
                    <DateRangeFilter
                        onChange= {onDateRangeChange}
                        value = {dateRange}
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
        </FilterBarContainer>
    )
}