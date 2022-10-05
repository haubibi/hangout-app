import { 
    FC
} from 'react';
import { 
    EnvironmentFilled ,
    ClockCircleFilled,
} from '@ant-design/icons';
import { 
    Avatar,
    Popover
 } from 'antd';
import { 
    EventCardCon,
    ContentRow,
    ContentCol,
    PopoverContentDiv,
    MetaCon,
    CardTextSpan
} from "./event-card.styles";

import { ITask } from '../../../interfaces/task.interface';
import { IImageObjWithUrl } from '../../../interfaces/images.interface';
import { useNavigate } from 'react-router-dom';
import { 
    getMomentFullTimeString,
    getCurrentTimeIsBeforeComparedTime,
    getMomentByDateAndTimeString,
    cardDateFormat
} from '../../../utils/date/date.utils';
import { CardTags } from '../card-tags/card-tags.component';
import { useCallback } from 'react';

export interface IEventCardProps {
    task: ITask;
}

const defaultbodyStyle = {
    height: '150px'
}

const defaultSrc = require('../../../assets/avatar/wolf.png')
const coverImg = (
    coverImg: IImageObjWithUrl | null,
    onClick: (e: any) => void
) => {
    return <img 
                alt= {coverImg?coverImg.name:'wirewolf'} 
                src= {coverImg?coverImg.url:defaultSrc} 
                height = "200px"
                onClick={ onClick }
                style = {{cursor: "pointer"}}
            />;
}

const getCityText = (address: string) => {
    let cityString:string;  
    const isSplitedByComma = address.indexOf(',') === -1? false:true;
    if(isSplitedByComma) {
        if(address.split(',')[1]){
            const cityArr= address.split(',')[1].split(' ');
            cityString = cityArr[cityArr.length - 1];
        }
    } else {
        cityString = address;
    }
    return cityString;
}



const getSrc = (taskId: string) => {
    switch(taskId) {
        case 'ZvdHBdjwPNTKAQOa5S2Mo65bzU73_003874030697579145':
            return require('../../../assets/avatar/wcy.jpg');
        case 'ZvdHBdjwPNTKAQOa5S2Mo65bzU73_06192617512878347':
            return require('../../../assets/avatar/zuo.png');
            default:
                return "https://joeschmoe.io/api/v1/random"; 
    }
}





export const EventCard:FC<IEventCardProps> = ({
    task
}) =>{
    const navigate = useNavigate();
    const { frontCoverImage, title, description, id, keyWords, startTime, startDate, endTime, endDate, latLngAndAddress, open} = task;
    const avartaSrc = getSrc(id);
    const startTimeString = getMomentFullTimeString(startDate!, startTime!);
    const endimeString = getMomentFullTimeString(endDate!, endTime!);
    const cityText = getCityText(latLngAndAddress.address); 
    const startTimeText = getMomentByDateAndTimeString(startDate!, startTime!).format(cardDateFormat);
    // const deadline = getMomentByDateAndTimeString(startDate!, startTime!);

    const TimeContent = (
        <PopoverContentDiv>
            <p>{`Start time`}</p>
            <p>{startTimeString}</p>
            <p>{`End time`}</p>
            <p>{endimeString}</p>
        </PopoverContentDiv>
    );
    const LocationContent = (
        <PopoverContentDiv>
          <p>{latLngAndAddress.address}</p>
        </PopoverContentDiv>
    );

   

    const cardOnClick = useCallback((e: any)=> {
        console.log("taskId:", task.id)
        navigate(`/task_${id}`,{state: task.id});
    },[id, navigate, task]);

    console.log("description:", description)
    return (
        <EventCardCon
            cover={coverImg(frontCoverImage, cardOnClick)}
            bodyStyle = {defaultbodyStyle}
            // onClick = {cardOnClick}
            actions={ 
                [            
                <Popover content={ LocationContent }>
                    <EnvironmentFilled key = "address"/>
                    <CardTextSpan>{ cityText }</CardTextSpan>
                </Popover>,
                <Popover content={ TimeContent }>
                    <ClockCircleFilled key="time"  />    
                    <CardTextSpan>{ startTimeText }</CardTextSpan>
                </Popover>
            ]
        }
            // onTabChange = { onTabChange }
            title = {title}
        >
            <ContentRow>
                <ContentCol span={24}>
                    <CardTags tags = {keyWords}/>
                </ContentCol>
            </ContentRow>
            <ContentRow>
                <ContentCol span={24}>
                    <MetaCon
                        avatar={<Avatar src= {avartaSrc} />}
                        description = {description}
                    />
                </ContentCol>
            </ContentRow>    
        </EventCardCon>
    )
}