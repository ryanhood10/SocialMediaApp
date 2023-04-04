const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String!
    password: String!
    messages: [Message]
    friends: [User]
    friendCount: Int
  }

  type Message {
    _id: ID
    MessageText: String!
    createdAt: String
    username: String
    replies: [Reply]
    replyCount: Int
  }

  type Reply {
    _id: ID!
    replyBody: String!
    createdAt: String
    username: String!
  }

  type Auth {
    token: ID
    user: User
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LogoutResponse {
    success: Boolean!
    message: String
  }

  input MessageInput {
    MessageText: String!
  }

  input ReplyInput {
    replyBody: String!
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    messages: [Message]
    message(id: ID!): Message
  }


  type Mutation {
    login(input: LoginInput!): Auth
    signup(input: SignupInput!): Auth
    logout: LogoutResponse
    createMessage(input: MessageInput!): Message
    deleteMessage(id: ID!): Message
    createReply(messageId: ID!, input: ReplyInput!): Reply
    deleteReply(messageId: ID!, replyId: ID!): Message
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
  }
`;

module.exports = typeDefs;
