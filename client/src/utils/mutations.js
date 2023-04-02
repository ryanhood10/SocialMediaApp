import { gql } from '@apollo/client'

export const SIGNUP = gql`
mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        username
        email
        password
      }
    }
}`;

export const LOGIN = gql`
mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        email
        password
      }
    }
}`;
