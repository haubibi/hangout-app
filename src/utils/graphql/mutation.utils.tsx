import { gql } from '@apollo/client';

export const ADDUSER = gql`
    mutation(
        $uid:String,
        $displayName:String,
        $email:String
    ) {
        addUser(
          uid:$uid, 
          displayName: $displayName, 
          email: $email
          ) 
        {
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
