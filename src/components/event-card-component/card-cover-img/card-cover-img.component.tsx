import { FC } from 'react';

import { Image } from './card-cover-img.styles';
import { IImageObjWithUrl } from '../../../../functions/src/interfaces/images.interface';

interface ICardFrontCoverProps {
    imageUrlObj: IImageObjWithUrl | null;
    height: number;
    onClick: () => void;
    cursorPointer: boolean;
}

const defaultSrc = require('../../../assets/eventc-card-front-cover/frontCover_default.jpg');

export const CardFrontCover:FC<ICardFrontCoverProps> = ({
    imageUrlObj,
    height,
    onClick,
    cursorPointer
}) => {
    return (
        <Image
            alt= {imageUrlObj?imageUrlObj.name:'hang out'} 
            src= {imageUrlObj?imageUrlObj.url:defaultSrc} 
            height = {height}
            onClick={ ()=>{onClick();}}
            style = {{cursor: (cursorPointer? "pointer": "default")}}
        >

        </Image>
    )
}