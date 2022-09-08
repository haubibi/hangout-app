import { gql } from '@apollo/client';
export const GETALLMAILS = gql`
    query{
        getTaskById {
        email
        }
    }
`

export const GETTASKBYID = gql`
query($id:String){
    getTaskById(id:$id){
      id
      title
      startDate
      startTime
      endDate
      endTime
      organizer {
          uid
          displayName
          email
        }
      showImages {
        uid
        name
        refPath
        url
      }
      frontCoverImage{
        uid
        name
        refPath
        url
      }
      location {
        lng
        lat
      }
      reviews{
        user {
          uid
          displayName
          email
        }
        review
      }
      participants {
        uid
        displayName
        email
      }
      description
      participantsNumber
      open
      hide
      address
    }
  }
`