const { User, Message, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('thoughts')
          .populate('friends');
  
        return userData;
      }
  
      throw new AuthenticationError('Not logged in');
    },
  
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
  
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('thoughts')
        .populate('friends');
    },
  
    // get all thoughts
    messages: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Message.find(params).sort({ createdAt: -1 });
    },
  
    // get a thought by id
    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
  
      return { token, user };
    },
  
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect email or password');
      }
  
      const correctPw = await user.isCorrectPassword(password);
  
      if (!correctPw) {
        throw new AuthenticationError('Incorrect email or password');
      }
  
      const token = signToken(user);
      return { token, user };
    },
  
    addMessage: async (parent, args, context) => {
      // spread opporator should copy args and then append username to it to give it a user to refer to.  
      if (context.user) {
        const message = await Message.create({ ...args, username: context.user.username });
  
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { messages: message._id } },
          { new: true }
        );
  
        return message;
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },
  
    addReply: async (parent, { messageId, replyBody }, context) => {
      if (context.user) {
        // replyBody should give what a user's response is and then append the username to it to identify the person replying
        const updatedMessage = await Message.findOneAndUpdate(
          { _id: messageId },
          { $push: { replies: { replyBody, username: context.user.username } } },
          { new: true }
        );
  
        return updatedMessage;
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },
  
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');
  
        return updatedUser;
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
