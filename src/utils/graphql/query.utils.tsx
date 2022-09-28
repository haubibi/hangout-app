import { gql } from '@apollo/client';
import { 
  userFullObj,
  taskFullObj,
  participantNotificationObj,
} from './typeObject';
// ${userFullObj}
export const GETUSER = gql`
    query($uid:ID){
      getUserById (uid:$uid) {
          ${userFullObj}
      }      
    }
`
export const GETAllTASKS = gql`
    query{
      tasks {
          ${taskFullObj}
      }
    }
`;
export const GETTASKBYID = gql`
    query($id:ID){
      getTaskById (id:$id) {
          ${taskFullObj}
      }
    }
`;
export const GETPARTICIPANTNOTIFICATION = gql`
    query(
      $participantUid:ID,
      $taskId:ID,
      $organizerUid:ID,
    ){
      getParticipantNotification (
        taskId:$taskId
        participantUid:$participantUid
        organizerUid:$organizerUid
      ) {
          ${participantNotificationObj}
      }
    }
`;
// getFilteredTasks(currentLatLng: LatLngLiteralInput, taskFilter: TaskFilterInput): [Task]
export const GETFILTEREDTASKS = gql`
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