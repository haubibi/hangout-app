import { FC } from 'react';
import { IImageObjWithUrl, IImageObjWithUrlAndRefPath } from '../../../interfaces/images.interface';
import {
    TaskCarouselCon,
    ImageCon
} from './task-carousel.styles';
import { Carousel } from 'antd';

interface TaskCarouselProps {
    images: IImageObjWithUrlAndRefPath[];
}

export const TaskCarousel:FC<TaskCarouselProps> = ({
    images
}) => {

    const onAfterChange = (current: number) => {

    }

    return (
        <TaskCarouselCon>
            <Carousel 
                afterChange={onAfterChange}
                autoplay
            >
                {
                    images.map((image,index)=>{
                        const { url, name} = image;
                        return (
                            <ImageCon key = {index}>
                                <img src = {url} alt = {name} width = {250} height = {150}/>
                            </ImageCon>
                        )
                    })
                }
                 {/* <Carousel afterChange={onChange}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div> */}
    </Carousel>
        </TaskCarouselCon>
    )
}