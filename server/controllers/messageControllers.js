const { User, Message } = require('../models')


module.exports = {

    // Get all messages
    getMessages(req, res) {
        Message
            .find()
            .then((messages) => res.json(messages))
    },

    // Get a single message
    getSingleMessage(req, res) {
        // find a user by it's Id
        Message.findById(req.params.messageId)
            // populate the user portion of messages
            .populate('user')
            .then((messages) => {
                if (!messages) {
                    return res.status(404).json({ message: 'No message found with that ID' });
                }
                res.json(messages);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },


    // Create a new Message 
     async createMessage(req, res) {
        try {
            // Create a new message using the request body
            const newMessage = await Message.create(req.body);

            // Find the user with the associated username
            const currentUser = await User.findOne({ username: req.body.username });

            if (!currentUser) {
                return res.status(404).json({ message: "User not found" });
            }
        
            // Push the messages' _id to the user's messages array
            currentUser.messages.push(newMessage._id);

            // Save the updated user
            currentUser.save();

            // Return the created message
            return res.status(201).json(newMessage);
            
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }            
    },

    // updating Message
    updateMessage(req, res) {
        Message.findOneAndUpdate(
            { _id: req.params.messageId },
            { $set: req.body },
            { runValidators: true, new: true }

            .then((messages) => {
                if (!messages) {
                    res.status(404).json({ message: 'No message with this ID exist' })
                }
                res.json(messages)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    )},
 
    // delete Message
    deleteMessage(req, res) {
        Message.findByIdAndDelete(req.params.MessageId)
            .then((deletedMessage) => {
                if (!deletedMessage) {
                    return res.status(404).json({ message: 'No message found with that ID' });
                }
                res.json(deletedMessage);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
}