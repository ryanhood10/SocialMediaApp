// BACKEND REFERENCE

const router = require('express').Router();
const message_routes = require('./messages');
const user_routes = require('./users');

router.use('/messages', message_routes); 
router.use('/users', user_routes);


module.exports = router;
