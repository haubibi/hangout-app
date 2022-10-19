import { gql } from '@apollo/client';
import { 
  userFullObj,
  taskFullObj,
} from './typeObject';
// ${userFullObj}
export const GET_USER = gql`
    query($uid:ID){
      getUserById (uid:$uid) {
          ${userFullObj}
      }      
    }
`
export const GET_All_TASKS = gql`
    query{
      tasks {
          ${taskFullObj}
      }
    }
`;
export const GET_TASK_BY_ID = gql`
    query($id:ID){
      getTaskById (id:$id) {
          ${taskFullObj}
      }
    }
`;
// didn't use
export const GET_FILTERED_TASKS = gql`
    query(
      $currentLatLng:LatLngLiteralInput,
      $taskFilter: TaskFilterInput
    ){
      getFilteredTasks (
        currentLatLng:$currentLatLng,
        taskFilter:$taskFilter
      ) {
          ${taskFullObj}
      }
    }
`
// didn't use
export const GETSEARCHTASKS = gql`
    query(
      $input: String,
      $taskStartIndex: Int,
      $amout: Int
    ){
      getSearchTasks (
        input: $input,
        taskStartIndex: $taskStartIndex,
        amout: $amout
      ) {
          totalLength
          tasks {
            ${taskFullObj}
          }
      }
    }
`