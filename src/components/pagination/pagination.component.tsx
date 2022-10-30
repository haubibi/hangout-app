import {FC} from 'react';
import { PaginationContainer, PaginationUl } from './pagination.styles';
import type { PaginationProps } from 'antd';


interface IPaginationProps {
    total: number;
    pageSize:number;
    onChange: (e: number) =>void;
}

export const PaginationBar:FC<IPaginationProps> = ({
    total,
    onChange,
    pageSize
}) => {
    
    const onPageChange: PaginationProps['onShowSizeChange'] = (current) => {
        // console.log(current);
        onChange(current)
    };
    return(
        <PaginationContainer>     
             <PaginationUl
                style={{}}
                showQuickJumper
                showSizeChanger
                onChange={onPageChange}
                defaultCurrent={1}
                total={total}
                pageSize = { pageSize }
                pageSizeOptions = {[10,20,30,40,50]}
                hideOnSinglePage
            />
        </PaginationContainer>
    )
}

