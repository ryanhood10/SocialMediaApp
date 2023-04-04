import { gql } from '@apollo/client'

export const USER = gql`
query Me {
  me {
    username
    messages{
      _id
    }
    friends {
      username
      _id
    }
  }
}`;

export const SEARCH = gql`
query User($username: String!) {
  user(username: $username) {
    username
  }
}`;

export const USER_PROFILE = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    friendCount
    messages {
      _id
    }
    username
  }
}`;