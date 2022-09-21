import { gql } from '@apollo/client';
import { 
  userFullObj,
  taskFullObj,
} from './typeObject';
// ${userFullObj}
export const GETUSER = gql`
    query($uid:ID){
      getUserById (uid:$uid) {
          uid
          email
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
`