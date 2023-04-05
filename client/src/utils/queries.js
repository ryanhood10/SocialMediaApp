import { gql } from '@apollo/client'

export const USER_PROFILE = gql`
query User($username: String!) {
  user(username: $username) {
    friends {
      username
    }
    username
    messages {
      MessageText
      createdAt
    }
  }
}`;

export const CHAT = gql`
query Messages {
  messages {
    MessageText
    username
    createdAt
  }
}`;