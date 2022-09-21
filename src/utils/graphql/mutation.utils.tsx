import { gql } from '@apollo/client';


import { 
  userFullObj,
  taskFullObj,
  ParticipantsObj,
  UserSignUpInput
 } from './typeObject';

//  # ${userFullObj}
export const ADDUSER = gql`
    mutation(
        $userInput: UserInput
    ) {
        addUser(userInput: $userInput){
            ${UserSignUpInput}
        }
    }
`
export const ADDTASK = gql`
    mutation (
      $taskObj: TaskInput
    ) {
      addTask(taskObj:$taskObj){
          ${taskFullObj}
      } 
    }
`
// addParticipant(participantUid: ID, taskId: ID, addUserUid: ID, type: AddParticipantRequestEnum): Paticipant

export const ADDPARTICIPANT = gql`
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