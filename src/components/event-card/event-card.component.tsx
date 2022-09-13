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
const coverImg = (coverImg: IImageObjWithUrl | null) => {
    return <img alt= {coverImg?coverImg.name:'wirewolf'} src= {coverImg?coverImg.url:defaultSrc} height = "200px"/>;
}


const getSrc = (taskId: string) => {
    switch(taskId) {
        case 'ZvdHBdjwPNTKAQOa5S2Mo65bzU73_003874030697579145':
            return require('../../assets/avatar/wcy.jpg');
        case 'ZvdHBdjwPNTKAQOa5S2Mo65bzU73_06192617512878347':
            return require('../../assets/avatar/zuo.png');
            default:
                return "https://joeschmoe.io/api/v1/random"; 
    }
}

export const EventCard:FC<IEventCardProps> = ({
    task
}) =>{
    const { frontCoverImage, title, description, id} = task;
    const avartaSrc = getSrc(id);
    console.log(task)
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
                    avatar={<Avatar src= {avartaSrc} />}
                    // title= {title}
                    description= { description.length> 11 ?`${description.slice(0, 11)}...`:description}
                />
            </EventCardCon>
    )
}