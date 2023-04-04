const { User, Message, Reply } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('messages')
          .populate('friends');
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  
    // get all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('messages')
        .populate('friends');
    },
  
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('messages')
        .populate('friends');
    },
  
    // get all messages
    messages: async (parent, { username, offset = 0, limit = 10 }) => {
      const params = username ? { username } : {};
      const messages = await Message.find(params)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit);
    
      return messages;
    },
  
    // get a message by id
    message: async (parent, { messageId }) => {
      return Message.findOne({ _id: messageId });
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args.input);
      const token = signToken(user);
      return { token, user };
    },
  
    login: async (parent, { input }) => {
      const user = await User.findOne({ email: input.email });
      if (!user) {
        throw new AuthenticationError('Incorrect email');
      }
  
      const correctPw = await user.isCorrectPassword(input.password);
  
      if (!correctPw) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },

    logout: async (parent, args, context) => {
      if (context.user) {
        // Clear the JWT cookie on the client by setting an expired cookie
        context.res.clearCookie('jwt');
  
        return { message: 'Successfully logged out' };
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },
  
    createMessage: async (parent, args, context) => {
      // spread opporator should copy args and then append username to it to give it a user to refer to.  
      if (context.user) {
        const message = await Message.create({ MessageText: args.input.MessageText, username: context.user.username });

        const updated_user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { messages: message._id } },
          { new: true }
        );
        console.log(updated_user)
  
        return message;
      };
    },
  
    createReply: async (parent, { messageId, replyBody }, context) => {
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

    removeFriend: async (parent, { friendId }, context) => {
      try {
        if (context.user) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { friends: friendId } },
            { new: true }
          ).populate('friends');
    
          if (!updatedUser) {
            throw new Error('User not found');
          }
    
          return updatedUser;
        }
        
        throw new AuthenticationError('You must be logged in to remove a friend');
      } catch (err) {
        console.log(err);
        throw new Error('Failed to remove friend');
      }
    },
    

    deleteMessage: async (parent, { messageId }, context) => {
      if (context.user) {
        const message = await Message.findOne({ _id: messageId });
  
        if (!message) {
          throw new Error('Message not found');
        }
  
        // Check if the user is the owner of the message
        if (message.username !== context.user.username) {
          throw new AuthenticationError('You are not authorized to delete this message');
        }
  
        await Message.deleteOne({ _id: messageId });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { messages: messageId } }
        );
  
        return { message: 'Message successfully deleted' };
      }
  
      throw new AuthenticationError('You need to be logged in!');
    },
  
    deleteReply: async (parent, { messageId, replyId }, context) => {
      if (context.user) {
        const message = await Message.findOne({ _id: messageId });
  
        if (!message) {
          throw new Error('Message not found');
        }
  
        const reply = message.replies.id(replyId);
  
        if (!reply) {
          throw new Error('Reply not found');
        }
  
        // Check if the user is the owner of the reply
        if (reply.username !== context.user.username) {
          throw new AuthenticationError('You are not authorized to delete this reply');
        }
  
        await reply.remove();
        await message.save();
  
        return { message: 'Reply successfully deleted' };
      }
  
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};




  


module.exports = resolvers;
