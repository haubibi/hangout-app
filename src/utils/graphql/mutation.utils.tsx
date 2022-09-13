import { gql } from '@apollo/client';
import { 
  userFullObj,
  taskFullObj
 } from './typeObject';

export const ADDUSER = gql`
    mutation(
        $userInput: UserInput
    ) {
        addUser(userInput: $userInput){
            ${userFullObj}
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
