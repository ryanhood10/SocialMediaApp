
const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
  res.send('Hello, world!');
});

// BACKEND REFERENCE

const router = require('express').Router();
const api_routes = require('./api');

router.use('/api', api_routes);

router.use((req, res) => res.send('Wrong route!'));


module.exports = router;
