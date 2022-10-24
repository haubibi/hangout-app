import { 
    FC,
 } from 'react';
import { IImageObjWithUrlAndRefPath } from '../../../interfaces/images.interface';
import {
    TaskCarouselCon,
    ImageCon
} from './task-carousel.styles';
import { Carousel } from 'antd';

interface TaskCarouselProps {
    images: IImageObjWithUrlAndRefPath[];
    imgWidth: number;
    imgHeight: number;
}
const defaultSrc = require('../../../assets/eventc-card-front-cover/frontCover_default.jpg');

export const TaskCarousel:FC<TaskCarouselProps> = ({
    images,
    imgWidth,
    imgHeight
}) => {

    const currentImages = images.length === 0? [{
        url: defaultSrc,
        name: 'img'
    }]: images;


    return (
        <TaskCarouselCon>
            <Carousel
                autoplay
            >
                {
                    currentImages.map((image,index)=>{
                        const { url, name} = image;
                        return (
                            <ImageCon key = {index}>
                                <img src = {url} alt = {name} width = {imgWidth} height = {imgHeight}/>
                            </ImageCon>
                        )
                    })
                }
    </Carousel>
        </TaskCarouselCon>
    )
}