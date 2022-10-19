import { gql } from '@apollo/client';


import { 
  userFullObj,
  taskFullObj,
  ParticipantsObj,
  UserSignUpInput,
  TaskUpdateNotificationObj,
  RequestNotificationObj,
  ApplicationNotificationObj,
 } from './typeObject';

//  # ${userFullObj}
export const ADD_USER = gql`
    mutation(
        $userInput: UserInput
    ) {
        addUser(userInput: $userInput){
            ${UserSignUpInput}
        }
    }
`
// updateUserInfo(userUid: String, userInput: UserUpdateInput): User
export const UPDATE_USER_INFO = gql`
    mutation(
        $userUid: String
        $userInput: UserUpdateInput
    ) {
      updateUserInfo(
        userUid:$userUid,
        userInput: $userInput
      ){
          ${userFullObj}
      }
    }
`
export const ADD_TASK = gql`
    mutation (
      $taskObj: TaskInput,
      $isNewTaskForm: Boolean
    ) {
      addTask(
        taskObj:$taskObj,
        isNewTaskForm:$isNewTaskForm
      ){
          ${taskFullObj}
      } 
    }
`
export const DELETE_TASK = gql`
    mutation (
      $taskId: ID
    ) {
      deleteTask(taskId:$taskId){
          ${taskFullObj}
      } 
    }
`
// addParticipant(participantUid: ID, taskId: ID, addUserUid: ID, type: AddParticipantRequestEnum): Paticipant

export const ADD_PARTICIPANT = gql`
    mutation (
      $participantUid: ID,
      $taskId: ID,
      $addTaskRequestType: String
    ) {
        addParticipant(
          participantUid:$participantUid,
          taskId:$taskId,
          addTaskRequestType:$addTaskRequestType
        ){
          ${ParticipantsObj}
      } 
    }
`
export const QUIT_PARTICIPANT = gql`
    mutation (
      $participantUid: ID,
      $taskId: ID,
      $quitTaskRequestType: String
    ) {
        quitParticipant(
          participantUid:$participantUid,
          taskId:$taskId,
          quitTaskRequestType:$quitTaskRequestType
        ){
          ${ParticipantsObj}
      } 
    }
`

//updateNotifications(userUid: String, notifications: [NotificationInput]): [NotificationType]
export const UPDATE_APPLICATION_NTNOTIFICATIONS = gql`
    mutation (
      $userUid: ID,
      $notifications: [ParticipantApplicationNotificationInput],
    ) {
      updateApplicationtNotifications(
          userUid:$userUid,
          notifications:$notifications,
      ){
         ${ApplicationNotificationObj}
      } 
    }
`
export const UPDATE_REQUEST_NTNOTIFICATIONS = gql`
    mutation (
      $userUid: ID,
      $notifications: [ParticipantRequestNotificationInput],
    ) {
      updateRequestNotifications(
          userUid:$userUid,
          notifications:$notifications,
      ){
         ${RequestNotificationObj}
      } 
    }
`
export const UPDATE_TASK_UPDATE_NTNOTIFICATIONS = gql`
    mutation (
      $userUid: ID,
      $notifications: [TaskUpdateNotificationInput],
    ) {
      updateTaskUpdateNotifications(
          userUid:$userUid,
          notifications:$notifications,
      ){
         ${TaskUpdateNotificationObj}
      } 
    }
`

// deleteApplicationNotification(participantUid: ID, taskId: ID, organizerUid: ID): [ParticipantApplicationNotificationType]

export const DELETE_APPLICATION_NTNOTIFICATION = gql`
    mutation (
      $participantUid: ID,
      $taskId: ID,
      $organizerUid: ID,
    ) {
      deleteApplicationNotification(
          participantUid:$participantUid,
          taskId:$taskId,
          organizerUid:$organizerUid
      ){
         ${ApplicationNotificationObj}
      } 
    }
`
// deleteEventUpdateNotification(participantUid: ID, taskId: ID, organizerUid: ID): [TaskUpdateNotificationType]

export const DELETE_EVENT_UPDATE_NTNOTIFICATION = gql`
    mutation (
      $participantUid: ID,
      $taskId: ID,
      $organizerUid: ID,
    ) {
      deleteEventUpdateNotification(
          participantUid:$participantUid,
          taskId:$taskId,
          organizerUid:$organizerUid
      ){
         ${TaskUpdateNotificationObj}
      } 
    }
`
