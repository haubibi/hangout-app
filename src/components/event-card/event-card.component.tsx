import { FC } from 'react';
import { 
    EditOutlined, 
    EllipsisOutlined, 
    SettingOutlined 
} from '@ant-design/icons';
import { 
    Avatar,
    Col,
    Row
 } from 'antd';
import { 
    EventCardCon,
    ContentRow,
    ContentCol,
    TitleDiv
 } from "./event-card.styles";

import { ITask } from '../../utils/interfaces/task.interface';
import { IImageObjWithUrl } from '../../utils/images/images.utils';

export interface IEventCardProps {
    task: ITask;
}



const { Meta } = EventCardCon;
const defaultSrc = require('../../assets/avatar/wolf.png')
const avatar = require('../../assets/avatar/wcy.jpg');
const coverImg = (coverImg: IImageObjWithUrl | null) => {
    return <img alt= {coverImg?coverImg.name:'wirewolf'} src= {coverImg?coverImg.url:defaultSrc}/>;
}
const avatarImg = (coverImg: IImageObjWithUrl | null) => {
    return <img alt= {'wcy'} src= {avatar}/>;
}


export const EventCard:FC<IEventCardProps> = ({
    task
}) =>{
    const { frontCoverImage, title, description } = task;


    return (
            <EventCardCon
                cover={coverImg(frontCoverImage)}
                hoverable = {false}
                bordered
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
     
                title = {title}
            >

                <ContentRow>
                    <ContentCol span={4}>
                        {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}
                    </ContentCol>
                    <ContentCol span={20}>
                        {/* <TitleDiv>{title}</TitleDiv> */}
                    </ContentCol>
                </ContentRow>
                {/* <Rol */}
                <Meta
                    avatar={<Avatar src= {avatar} />}
                    // title= {title}
                    description= { description}
                />
            </EventCardCon>
    )
}