import {FC} from 'react';
import { PaginationContainer, PaginationUl } from './pagination.styles';
import type { PaginationProps } from 'antd';


interface IPaginationProps {
    total: number;
    pageSize:number;
    onChange: (e: number, size: number) =>void;
}

export const PaginationBar:FC<IPaginationProps> = ({
    total,
    onChange,
    pageSize
}) => {
    
    const onPageChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
        onChange(current, pageSize)
    };
    return(
        <PaginationContainer>
            
             <PaginationUl
                style={{}}
                showQuickJumper
                showSizeChanger = {true}
                onChange={onPageChange}
                defaultCurrent={1}
                total={total}
                pageSize = { pageSize }
                pageSizeOptions = {[10,20,30,40,50]}
            />
        </PaginationContainer>
    )
}

