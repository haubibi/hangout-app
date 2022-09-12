import { gql } from '@apollo/client';
export const GETALLMAILS = gql`
    query{
        getTaskById {
        email
        }
    }
`

export const GETUSER = gql`
    query($uid:String){
      getUserById (uid:$uid){
          displayName
          sex
          uid
          email
          avatarImg{
            uid
            name
            refPath
            url
          }
        }
    }
`
export const GETAllTASKS = gql`
    query{
      tasks {
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
        latLngAndAddress {
          latLng {
            lng
            lat
          }
          address
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
      latLngAndAddress {
        latLng {
          lng
          lat
        }
        address
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
    }
}
`