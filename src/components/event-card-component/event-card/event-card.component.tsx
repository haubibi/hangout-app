import { 
    FC,
    useCallback,
    useEffect,
    useState,
    useMemo
} from 'react';
import { 
    EnvironmentFilled ,
    ClockCircleFilled,
} from '@ant-design/icons';
import { 
    Avatar,
    Popover,
    Tooltip
 } from 'antd';
import { 
    EventCardCon,
    ContentRow,
    ContentCol,
    PopoverContentDiv,
    MetaCon,
    CardTextSpan,
    AttendeesSpan,
    AttendeeDateRow,
    AttendeeCol,
    DateStatusCol
} from "./event-card.styles";

import { ITask } from '../../../interfaces/task.interface';
import { useNavigate } from 'react-router-dom';
import { 
    getMomentFullTimeString,
    getMomentByDateAndTimeString,
    cardDateFormat,
    getCurrentMoment
} from '../../../utils/date/date.utils';
import { useQuery } from '@apollo/client'
import { CardTags } from '../card-tags/card-tags.component';
import { CardFrontCover } from '../card-cover-img/card-cover-img.component';
import { UserAvatarBase } from '../../user-avatar/user-avatar-base/user-avatar-base.component';
import { IUser } from '../../../interfaces/user.interface';
import { GET_USER } from '../../../utils/graphql/query.utils';
import { getNumberofParticipants } from '../../../interfaces/participate.interface';
import { ExpiredDateIcon } from '../../../assets/svgIcon/custom.icon';

export interface IEventCardProps {
    task: ITask;
}

const defaultbodyStyle = {
    height: '150px'
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



export const EventCard:FC<IEventCardProps> = ({
    task
}) =>{
    const navigate = useNavigate();
    const [organizerUser, setOrganizerUser] = useState<IUser>();
    const { data } = useQuery(GET_USER,{
        variables: {
            uid: task.organizer
        }
    });

    const { frontCoverImage, title, description, id, keyWords, startTime, startDate, endTime, endDate, latLngAndAddress, open, participants, participantsNumber} = task;
    
    const startTimeString = useMemo(()=> getMomentFullTimeString(startDate!, startTime!), [startDate,startTime]);
    const startTimeMoment = useMemo(()=> getMomentByDateAndTimeString(startDate!, startTime!), [startDate,startTime]);
    const endimeString = useMemo(()=> getMomentFullTimeString(endDate!, endTime!), [endDate,endTime]);
    const cityText = useMemo(()=> getCityText(latLngAndAddress.address), [latLngAndAddress.address]);
    const currentMoment = getCurrentMoment();
    const startTimeText = useMemo(()=> getMomentByDateAndTimeString(startDate!, startTime!).format(cardDateFormat), [startDate, startTime]);
    const currentAttendees = useMemo(()=> getNumberofParticipants(participants), [participants]);


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

   
    //get the organizer
    useEffect(()=>{
        if(data && data.getUserById) {
            setOrganizerUser(data.getUserById);
        }
    },[data])


    const cardOnClick = useCallback(()=> {
        navigate(`/task_${id}`,{state: id});
    },[id, navigate]);


    console.log("description:", description)
    return (
        <EventCardCon
            cover={
                <CardFrontCover 
                    imageUrlObj={frontCoverImage}  
                    onClick = {cardOnClick}
                    height = {200}
                    cursorPointer = {true}
                />
            }
            bodyStyle = {defaultbodyStyle}
            actions={ 
                [            
                <Popover content={ LocationContent } trigger = {['click', 'hover']} >
                    <EnvironmentFilled key = "address"/>
                    <CardTextSpan>{ cityText }</CardTextSpan>
                </Popover>,
                    startTimeMoment.isBefore(currentMoment) ?
                    <Tooltip title="out of date" trigger={['click','hover']}>
                            <ExpiredDateIcon />
                            <CardTextSpan>{ startTimeText }</CardTextSpan>
                    </Tooltip>
                    :
                    <Popover content={ TimeContent } trigger = {['click', 'hover']} >
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
                        avatar={<UserAvatarBase userAvatarImg = {organizerUser? organizerUser.avatarImg: null} />}
                        description = {description}
                    />
                </ContentCol>
            </ContentRow>
            <AttendeeDateRow>
                <AttendeeCol span={12}>
                    <AttendeesSpan>Attendees {`${currentAttendees}/${participantsNumber}`}</AttendeesSpan>
                </AttendeeCol>
            </AttendeeDateRow>
        </EventCardCon>
    )
}