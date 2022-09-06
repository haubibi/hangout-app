import { gql } from '@apollo/client';

export const ADDUSER = gql`
    mutation(
        $userInput: UserInput
    ) {
        addUser(userInput: $userInput){
          uid
          displayName
          email
        }
    }
`
export const ADDTASK = gql`
    mutation (
      $taskObj: TaskInput
    ) {
      addTask(taskObj:$taskObj){
        description
      } 
    }
`
