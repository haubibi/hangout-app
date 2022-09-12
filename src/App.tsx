
import React, { FC, useEffect, useContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GETUSER } from './utils/graphql/query.utils';
// import { useLoadScript } from '@react-google-maps/api';
import AppLayout from './routers/appLayout/appLayout.component';
import Home from './routers/home/home.component';
import TaskFormPage from './routers/taskFormPage/task-form-page.component';
import SignUpForm from './routers/sign-up-form/sign-up-form.component';
import SignInForm from './routers/sign-in-form/sign-in-form.component';
import Task from './routers/task/task.component';
import { onUserAuthStateChanged} from './utils/firebase/firebase.utils';
import { UserContext } from './context/user.context';
import "antd/dist/antd.css";




const  App: FC = () => {
  const {setUserUid} = useContext(UserContext);
  useEffect(()=>{
    onUserAuthStateChanged(async(user) =>{
      console.log(user)
      if(!user){
          setUserUid('');
      } else {
        const {uid} = user;
        console.log(uid)
        setUserUid(uid);
      }
    });
  },[setUserUid]);


  return (
    <Routes>
      <Route path = '/' element = { <AppLayout />}>
        <Route index element = { <Home />} />
        <Route path = 'signUp' element = { <SignUpForm />} />
        <Route path = 'signIn' element = { <SignInForm />} />
        <Route path = 'taskForm_:taskId' element = { <TaskFormPage />} />
        <Route path = 'task' element = { <Task />} />
      </Route>
    </Routes>
  );
}

export default App;
