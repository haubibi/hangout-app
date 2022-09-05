import { Input } from 'antd';
import React, {FC} from 'react';
const { Search } = Input;
const SearchInput:FC = ()=> {
    
    return(
        <Search placeholder="search the event" enterButton="Search" size="large" loading />
    )
}


export default SearchInput;