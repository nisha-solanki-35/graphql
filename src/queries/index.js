import { gql } from "@apollo/client";

export const GET_PROFILES = gql`
  query{
    getProfiles{
      sEmail
      sFirstName
      sLastName
    }
  }
`
export const CREATE_USER = gql`
  mutation($Email: String!, $FName: String!, $LName: String!, $Password: String!) {
    register(input:{
      sEmail: $Email
      sFirstName: $FName
      sLastName: $LName
      sPassword: $Password
    })
  }
`
export const SIGN_IN = gql`
    mutation mirecall_Login($Email: String!, $Password: String!){
      userLogin(input:{
        sEmail: $Email
        sPassword: $Password
      })
    }
`
export const GET_RECORDS = gql`
    query{
      getRecords{
        records{
          _id
          iUserId
          eMediaType
          eStatus
        }
      }
    }
`

export const LOG_IN = gql`
    mutation FWL_Login($MobNum: String!, $Password: String!){
      userLogin(input:{
        sMobNumber: $MobNum
        sPassword: $Password
      })
    }
`

export const GET_MATCHES = gql`
  query getMatches($offset: Float, $limit: Float){
    getMatches(input:{
      nOffset: $offset
      nLimit: $limit
    }){
      _id
      sKey
      eFormat
      sName
      sVenue
      eStatus
    }
  }
`

export const GET_MATCH = gql`
  query getMatch($id: ID!){
    getMatch(_id: $id){
      _id
      sName
      eFormat
      sSeasonKey
      sVenue
      eStatus
    }
  }
`