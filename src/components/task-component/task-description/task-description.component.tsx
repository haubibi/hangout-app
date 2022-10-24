import {
    FC
} from 'react';

import {
    TaskDescriptionCon,
    TaskDescriptionItem,
    DividerCon
} from './task-description.styles';
import { getSplittedParagraph } from '../../../utils/event/event.utils';


export interface ITaskDescriptionProps {
    description: string;
}

export const TaskDescription: FC<ITaskDescriptionProps> = ({
    description
}) =>{
    const paragraphs = getSplittedParagraph(description);
    return (
        <TaskDescriptionCon>
            <DividerCon orientation="left">Description</DividerCon>
            {
                paragraphs.map((paragraph,key) => <TaskDescriptionItem key = {key}>{paragraph}</TaskDescriptionItem>)
            }
        </TaskDescriptionCon>
    )
}