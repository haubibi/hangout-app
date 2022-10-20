
import { 
    useContext,
    useEffect,
    useState
 } from 'react';
import { 
    MyEventOrganizePageCon,
    EmptyCon
 } from './my-event-organize-page.styles';
import { 
    NavigationContext,
    MyAccountMenuKey
} from '../../../context/navigation.context';
import { TasksContext } from '../../../context/tasks.context';
import { UserContext } from '../../../context/user.context';
import { getMyTasks } from '../../../utils/task/task.filter';
import { ITask } from '../../../interfaces/task.interface';
import { MyEventList } from '../my-event-list/my-event-list.components';

const MyEventOrganizePage =  () => {
    const { setCurrentMenuKey } = useContext(NavigationContext);
    const { currentUser } = useContext(UserContext);
    const { allTasks, refetchAllTasks } = useContext(TasksContext);
    const [ myTasks, setMyTasks] = useState<ITask[]>([]);
    
    //set the menu key
    useEffect(()=> {
        setCurrentMenuKey(MyAccountMenuKey.EVENTS_I_ORGANIZE);
    },[setCurrentMenuKey]);

    //get the tasks I organized

   //refetchUser
    useEffect(()=> {
        refetchAllTasks();
    },[refetchAllTasks]);

    //get All my tasks
    useEffect(()=>{
        if(allTasks && currentUser) {
            const myTasks = getMyTasks({
                type: "organize",
                userUid: currentUser.uid,
                tasks : allTasks,
                taskStatus: 'all',
                sortByDate: true
            });
            setMyTasks(myTasks);
        }
     },[allTasks, currentUser])

    return (
        <MyEventOrganizePageCon>
            {
                myTasks.length === 0?
                <EmptyCon  description={<span> No Events</span>} />:
                <MyEventList tasks={[...myTasks]}/>

            }
        </MyEventOrganizePageCon>
    )
}

export default MyEventOrganizePage;