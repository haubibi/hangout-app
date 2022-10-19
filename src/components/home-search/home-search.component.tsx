import { Input } from 'antd';
import { 
    FC,
} from 'react';
// import { CategoryFilter } from '../filter-component/category-filter/category-filter.component';
import { 
    HomeSearchContainer,
    CategoryFilterContainer
 } from './home-search.styles';
import { 
    useCallback,
    useState
 } from 'react';
import { EventCategory } from '../../interfaces/task.interface';
const { Search } = Input;


interface IHomeSearchProps {
    onSearch: (value: string, category: EventCategory)=>void;
    loading: boolean;
    initialCategory:EventCategory;
}

export const HomeSearch:FC<IHomeSearchProps> = ({
    onSearch,
    loading,
    initialCategory
}) =>{
    const [category, setCategory] = useState<EventCategory>(initialCategory);

    const onCategoryChangeHandle = useCallback((value: EventCategory)=>{
        setCategory(value);
    },[]);
    const onInputChangeHandle = useCallback((value: string)=>{
        onSearch(value, category);
    },[onSearch, category]);

    return(
        <HomeSearchContainer>
            <Search
                addonBefore = {<CategoryFilterContainer title = {false} value = {category} onChange={onCategoryChangeHandle}/>}
                placeholder="Search for keywords" 
                enterButton="Search" 
                size="large"
                onSearch={onInputChangeHandle}
                loading = {loading}
            />
            {/* ChangeEventHandler<HTMLInputElement></HTMLInputElement> */}
        </HomeSearchContainer>
    )
}

