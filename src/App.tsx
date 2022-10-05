
import React, { FC, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GETUSER } from './utils/graphql/query.utils';
// import { useLoadScript } from '@react-google-maps/api';
import AppLayout from './routers/appLayout/appLayout.component';
import MyAccountPage from './routers/my-account-page/my-account-page.component';
import Home from './routers/home/home.component';
import TaskFormPage from './routers/taskFormPage/task-form-page.component';
import SignUpForm from './routers/sign-up-form/sign-up-form.component';
import SignInForm from './routers/sign-in-form/sign-in-form.component';
import ResetPassWordForm from './routers/reset-password-form/reset-password-form.component';
import ForgetPassWordForm from './routers/forget-password-form/forget-password-form.component';
import Task from './routers/task/task.component';
import MyEventCardList from './components/my-account-page/my-event-card-list/my-event-card-list.component';
import MyNotifications from './components/my-account-page/my-notifications/my-notifications.component';
import MapSearch from './routers/map-search/map-search.component';
import { AccountPersonalInfo } from './components/my-account-page/account-personal-info/account-personal-info.components';
import { onUserAuthStateChanged} from './utils/firebase/firebase.utils';
import { UserContext } from './context/user.context';
import "antd/dist/antd.css";


// export enum NavigateEnum {
//   LOGINFINISHED = "LOGINFINISHED",
//   LOGOUTFINISHED = "LOGOUTFINISHED",
//   ADDTAKFORM = "ADDTAKFORM",
//   SIGNUP = "SIGNUP",
//   SIGNIN = "SIGNIN",
//   GOTOHOMEPAGE = "GOTOHOMEPAGE",
//   FORGETPASSWORD = "FORGETPASSWORD",
//   RESETPASSWORD = "RESETPASSWORD",
// }


const  App: FC = () => {
  const {setUserUid} = useContext(UserContext);
  useEffect(()=>{
    onUserAuthStateChanged(async(user) =>{
      if(!user){
        setUserUid('');
      }
    });
  },[setUserUid]);

//'personal-info'
  return (
    <Routes>
      <Route path = '/' element = { <AppLayout />}>
        <Route index element = { <Home />} />
        <Route path = 'signUp' element = { <SignUpForm />} />
        <Route path = 'myAccount' element = { <MyAccountPage />}>
          <Route index element = {<AccountPersonalInfo />} />
          <Route path = "events" element = {<MyEventCardList />} />
          <Route path = "notifications" element = {<MyNotifications />} />
        </Route>

        <Route path = 'mapSearch' element = { <MapSearch />} />
        <Route path = 'logIn' element = { <SignInForm />} />
        <Route path = 'reset-password' element = { <ResetPassWordForm />} />
        <Route path = 'forget-password' element = { <ForgetPassWordForm />} />
        <Route path = 'taskForm_:taskId' element = { <TaskFormPage />} />
        <Route path = 'task_:taskId' element = { <Task />} />
      </Route>
    </Routes>
  );
}

export default App;
