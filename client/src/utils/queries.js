import { gql } from '@apollo/client'

export const USER = gql`
query Me {
  me {
    friends {
      username
    }
  }
}`;

export const USER_PROFILE = gql`
query Me {
  me {
    username
  }
}`;