import { gql } from '@apollo/client';
import { 
  userFullObj,
  taskFullObj
} from './typeObject';

export const GETUSER = gql`
query($uid:String){
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
    query($id:String){
      getTaskById (id:$id) {
          ${taskFullObj}
      }
    }
`