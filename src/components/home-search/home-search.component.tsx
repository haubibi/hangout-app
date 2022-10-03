import { Input } from 'antd';
import { 
    FC,
    ChangeEvent
 } from 'react';
import { HomeSearchContainer } from './home-search.styles';
const { Search } = Input;


interface IHomeSearchProps {
    onSearch: (value: string)=>void;
}

export const HomeSearch:FC<IHomeSearchProps> = ({
    onSearch,
}) =>{
    return(
        <HomeSearchContainer>
            <Search 
                placeholder="input search text" 
                enterButton="Search" 
                size="large"
                onSearch={onSearch} 
                // onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
                // onSubmit = {(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
            />
            {/* ChangeEventHandler<HTMLInputElement></HTMLInputElement> */}
        </HomeSearchContainer>
    )
}

