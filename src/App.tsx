
import React, { FC, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useLoadScript } from '@react-google-maps/api';
import Navigation from './routers/navigation/navigation.component';
import Home from './routers/home/home.component';
import TaskForm from './routers/task-form/task-form.component'
import SignUpForm from './routers/sign-up-form/sign-up-form';
import Task from './routers/task/task.component';
import { onUserAuthStateChanged} from './utils/firebase/firebase.utils';
import { UserContext } from './context/user.context';
import { GoogleMapContext } from './context/google-map.context';

// import SignUpItem from './components/sign-up-item/sign-up-item.component';
import './App.less';
import "antd/dist/antd.css";
import { IUser } from './utils/interfaces/user.interface';


// const googleMapLib:("places" | "drawing" | "geometry" | "localContext" | "visualization")[]= ["places"];

const  App: FC = () => {
  const {setCurrentUser, additionalInfo, currentUser} = useContext(UserContext);
  const {setMapIsLoaded} = useContext(GoogleMapContext);
 

  useEffect(()=>{
    onUserAuthStateChanged(async(user) =>{
      // console.log(additionalInfo)
        if(!user) return;
        if(currentUser && user.uid === currentUser.uid) return;
        const {uid,email} = user;
        const userInfo = {
          displayName: '',
          uid,
          email
        };
        setCurrentUser(userInfo as IUser)
    });
  });
 


  return (
    <Routes>
      <Route path = '/' element = { <Navigation />}>
        <Route index element = { <Home />} />
        <Route path = 'signUp' element = { <SignUpForm />} />
        <Route path = 'taskForm' element = { <TaskForm />} />
        <Route path = 'task' element = { <Task />} />
      </Route>
    </Routes>
  );
}

export default App;
