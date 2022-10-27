import {
    FC
} from 'react';

import {
    TaskTagsCon,
    DividerCon,
    TagsCon,
    TagWrap
} from './task-tags..styles';
import { Tag } from 'antd';
import { getRandomColors } from '../../event-card-component/card-tags/card-tags.component';

export interface ITaskTagsProps {
    tags: string[];
}

export const TaskTags: FC<ITaskTagsProps> = ({
    tags
}) =>{
    const randomColors = getRandomColors(tags.length);
    return (
        <TaskTagsCon>
            <DividerCon orientation="left">Tags</DividerCon>
            <TagsCon>
                {
                    tags.map((keyword, index) => <TagWrap key = {index} ><Tag color={randomColors[index]}>{ `#${keyword}` }</Tag></TagWrap>)

                }
            </TagsCon>
        </TaskTagsCon>
    )
}