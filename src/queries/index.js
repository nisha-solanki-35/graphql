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
    }
  ){
    sEmail
  }}  
`

export const SIGN_IN = gql`
    mutation($Email: String!, $Password: String!){
      userLogin(input:{
        sEmail: $Email
        sPassword: $Password
      })
    }
`