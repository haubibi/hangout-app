
import { MyEventCardListCon } from './my-event-card-list.styles';
import { ITask } from '../../../../functions/src/interfaces/task.interface';
import {EventCardList} from '../../event-card-component/event-card-list/event-card-list.component';
interface EventCardListProps {
    tasks: ITask[]
}



const MyEventCardList = () => {
    return (
        <MyEventCardListCon>
            My event list
        </MyEventCardListCon>
    )
}

export default MyEventCardList;