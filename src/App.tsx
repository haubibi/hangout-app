
import React, { FC, useEffect, useContext, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import AppLayout from './routers/appLayout/appLayout.component';
import MyAccountPage from './routers/my-account-page/my-account-page.component';
import Home from './routers/home/home.component';
import TaskFormPage from './routers/taskFormPage/task-form-page.component';
import SignUpForm from './routers/sign-up-form/sign-up-form.component';
import SignInForm from './routers/sign-in-form/sign-in-form.component';
import ResetPassWordForm from './routers/reset-password-form/reset-password-form.component';
import ForgetPassWordForm from './routers/forget-password-form/forget-password-form.component';
import Task from './routers/task/task.component';
import MyEventPage from './components/my-account-page/my-event-page/my-event-page.component';
import MyEventOrganizePage from './components/my-account-page/my-event-organize-page/my-event-organize-page.component';
import MyEventAttendPage from './components/my-account-page/my-event-attend-page/my-event-attend-page.component';
import MyNotifications from './components/my-account-page/my-notifications/my-notifications.component';
import MapSearch from './routers/map-search/map-search.component';
import NotificationApplicationPage from './components/my-account-page/notifications-application-page/notifications-application-page.components';
import NotificationRequestPage from './components/my-account-page/notifications-request-page/notifications-request-page.components';
import NotificationEventPage from './components/my-account-page/notifications-event-page/notifications-event-page.components';
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
  const { setUserUid } = useContext(UserContext);
  const  {pathname}= useLocation();
  useEffect(()=>{
    onUserAuthStateChanged(async(user) =>{
      if(!user){
        setUserUid('');
      } else {
        if(user.emailVerified){
            setUserUid(user.uid);
          } else {
            setUserUid('');
        }
      }
    });
  },[setUserUid]);
  useEffect(()=>{
    document.body.style.width = "100%";
    if(pathname.search(/myAccount/g) !== -1){
      document.body.style.minWidth = "1500px";
    }else {
      document.body.style.minWidth = "0px";
    }
  },[pathname]);
//'personal-info'
  return (
    <Routes>
      <Route path = '/' element = { <AppLayout />}>
        <Route index element = { <Home />} />
        <Route path = 'signUp' element = { <SignUpForm />} />
        <Route path = 'myAccount' element = { <MyAccountPage />}>
          <Route index element = {<AccountPersonalInfo />} />
          <Route path = "events" element = {<MyEventPage />} >
            <Route index element = {<MyEventOrganizePage />}></Route>
            <Route path = "attend" element = {<MyEventAttendPage />}></Route>
          </Route>
          <Route path = "notifications" element = {<MyNotifications />} >
            <Route index element = {<NotificationApplicationPage />}></Route>
            <Route path = "requests" element = {<NotificationRequestPage />}></Route>
            <Route path = "event" element = {<NotificationEventPage />}></Route>
          </Route>
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
