import { FC } from 'react';
import { CardTagsCon } from './card-tags.styles';
import { Tag } from 'antd';

const TagColors = [
    "#f50","#2db7f5","#87d068", "#108ee9", "#4bdde1", "#c22197","#ff0000",
    "#115000"
];

const getRandomColors = (n:number):string[] =>{
    return TagColors.sort(() => 0.5 - Math.random()).slice(0,n);
}

interface ITagsProps {
    tags: string[];
}

const defaultTag = ['this man is lazy'];

export const CardTags:FC<ITagsProps> = ({
    tags
}) =>{
    const currentTags = tags.length > 0? tags: defaultTag;
    const randomColors = getRandomColors(currentTags.length);


    return(
        <CardTagsCon>
            {
                currentTags.map((keyword, index) => <Tag key = {index} color={randomColors[index]}>{ `#${keyword}` }</Tag>)
            }
        </CardTagsCon>
    )
}