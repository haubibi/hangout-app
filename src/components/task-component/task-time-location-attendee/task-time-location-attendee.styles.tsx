import styled from "styled-components";

import { 
    timeDateAttendeeConHeight,
    timeDateAttendeeConWidth,
    
} from '../../../utils/default-settings/event.settings';


export const TaskTimeLocationAttendeeCon = styled.div`
    width: ${timeDateAttendeeConWidth}px;
    height: ${timeDateAttendeeConHeight}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0px 0px 0px 30px;
`