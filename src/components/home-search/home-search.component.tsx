import { Input } from 'antd';
import { FC } from 'react';
import { HomeSearchContainer } from './home-search.styles';
const { Search } = Input;

export const HomeSearch:FC = () =>{
    return(
        <HomeSearchContainer>
            <Search placeholder="input search text" enterButton="Search" size="large" loading />
        </HomeSearchContainer>
    )
}

