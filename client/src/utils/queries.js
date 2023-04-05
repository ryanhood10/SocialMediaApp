import { gql } from '@apollo/client'

export const USER_PROFILE = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      friends {
        username
      }
      username
      messages {
        MessageText
        createdAt
      }
    }
  }
`;


export const CHAT = gql`
  query GetMessages {
    messages {
      _id
      MessageText
      username
      createdAt
    }
  }
`;
