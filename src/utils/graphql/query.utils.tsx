import { gql } from '@apollo/client';
export const GETALLMAILS = gql`
    query{
        getAllEmails {
        email
        }
    }
`