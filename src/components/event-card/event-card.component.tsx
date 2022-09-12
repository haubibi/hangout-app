import { FC } from 'react';
import { 
    EditOutlined, 
    EllipsisOutlined, 
    SettingOutlined 
} from '@ant-design/icons';
import { Avatar } from 'antd';
import { EventCardCon } from "./event-card.styles";
import { cardWidth } from '../../utils/layout-antdesign/layout';
import { ITask } from '../../utils/interfaces/task.interface';
import { IImageObjWithUrl } from '../../utils/images/images.utils';

export interface IEventCardProps {
    task: ITask;
}



const { Meta } = EventCardCon;
const defaultSrc = require('../../assets/avatar/wolf.png')
const coverImg = (coverImg: IImageObjWithUrl | null) => {
    return <img alt= {coverImg?coverImg.name:'wirewolf'} src= {coverImg?coverImg.url:defaultSrc}/>;
}


export const EventCard:FC<IEventCardProps> = ({
    task
}) =>{
    const { frontCoverImage, title, description } = task;


    return (
            <EventCardCon
                style={{width: cardWidth}}
                cover={coverImg(frontCoverImage)}
                hoverable
                bordered
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
                title = {title}
            >
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title= {title}
                    description= { description}
                />
            </EventCardCon>
    )
}