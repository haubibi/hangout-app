import { gql } from '@apollo/client';


import { 
  userFullObj,
  taskFullObj,
  ParticipantsObj,
  UserSignUpInput,
  ParticipantNotificationObj,
  TaskUpdateNotificationObj,
  FriendNotificationObj
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
export const UPDATE_PARTICIPA_NTNOTIFICATIONS = gql`
    mutation (
      $userUid: ID,
      $notifications: [ParticipantNotificationInput],
    ) {
      updateNotifications(
          userUid:$userUid,
          notifications:$notifications,
      ){
         ${ParticipantNotificationObj}
      } 
    }
`
export const UPDATE_TASK_UPDATE_NTNOTIFICATIONS = gql`
    mutation (
      $userUid: ID,
      $notifications: [TaskUpdateNotificationInput],
    ) {
      updateNotifications(
          userUid:$userUid,
          notifications:$notifications,
      ){
         ${TaskUpdateNotificationObj}
      } 
    }
`


// updateParticipantNotifications(userUid: String, notifications: [ParticipantNotificationInput]): [ParticipantNotificationType]
// updateTaskUpdateNotifications(userUid: String, notifications: [TaskUpdateNotificationInput]): [TaskUpdateNotificationType]