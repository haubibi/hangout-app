import { FC, useRef, useEffect, useState } from 'react';
import { 
    CardTagsCon,
    TagsPopover
} from './card-tags.styles';
import { Tag, Popover } from 'antd';
import { 
    tagSpanPadding,
    tagConPadding,
    spanColumnGap,
    maxTagsDivWidth,
} from '../../../utils/default-settings/card.setting';
import {maxKeyWords} from '../../form-component/task-form-item/task-form-item.component';

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


const getWidthOfSpan = (
    span:HTMLSpanElement,
    padding: number
):number => {
    return span.offsetWidth + padding* 2;
}

const useNumberOfTagsInDiv = (
    ref: React.MutableRefObject<HTMLDivElement> | undefined,
    tagConPadding: number,
    spanColumnGap: number,
    spanPadding:number,
    maxTagsDivWidth: number
): number => {
    const [numberOfTags, setNumberOfTags] = useState<number>(0);
    // const [width, setWidth] = useState<number>(0);
    
    useEffect(()=>{
        if(ref !== undefined){
            let todatWidth:number = 0;
            let tagsCount: number = 0;
            const spans: HTMLCollectionOf<HTMLSpanElement>= ref.current.getElementsByTagName('span');
            todatWidth = tagConPadding*2;
            Array.prototype.forEach.call(spans,(span)=>{
                const spanWidth = getWidthOfSpan(span, spanPadding);
                todatWidth += (spanWidth + spanColumnGap);
                if(todatWidth < maxTagsDivWidth){
                    tagsCount ++; 
                } else {
                    return;
                }
            });
            // setWidth(todatWidth);
            setNumberOfTags(tagsCount);
        }
    },[spanColumnGap, spanPadding, ref, tagConPadding, maxTagsDivWidth]);


    return numberOfTags;
}




export const CardTags:FC<ITagsProps> = ({
    tags
}) =>{
    const tagDivRef = useRef();
    const [currentTags, setCurrentTags] = useState<string[]>(tags.length > 0? tags: defaultTag);
    const randomColors = getRandomColors(maxKeyWords);
    const numberOfTags = useNumberOfTagsInDiv(tagDivRef,tagConPadding,spanColumnGap,tagSpanPadding, maxTagsDivWidth);

    console.log("numberOfTags:", numberOfTags)
  
    useEffect(()=>{
        setCurrentTags(tags.slice(0, numberOfTags + 1));
    },[numberOfTags, tags]);


    return(
        <CardTagsCon ref= {tagDivRef}>
            {
                currentTags.map((keyword, index) => <Tag key = {index} color={randomColors[index]}>{ `#${keyword}` }</Tag>)
            }
            {
                currentTags.length < tags.length?
                <Popover  
                    trigger={['click','hover']}
                    placement = "top"
                    content = {
                        <TagsPopover>
                            {
                                tags.map((keyword, index) => <Tag key = {index} color={randomColors[index]}>{ `#${keyword}` }</Tag>)
                            }

                        </TagsPopover>
                    }
                >

                    <span>...</span>
                </Popover >:
                null
            }
        </CardTagsCon>
    )
}