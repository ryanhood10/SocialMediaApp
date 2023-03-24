// BACKEND REFERENCE

const router = require('express').Router();
// all the functions are listed on the parsed out routes
const {
    getMessages,
    getSingleMessage,
    createMessage,
    updateMessage,
    deleteMessage  
} = require('../../controllers/messageControllers')


// // /api/users
router.route('/').get(getMessages).post(createMessage);

// // /api/users/:userId
router.route('/:thoughtId').get(getSingleMessage).put(updateMessage).delete(deleteMessage)

module.exports = router