const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';
// ^REPLACE THE TEXT ABOVE TO INCLUDE MONGODB CONNECTION STRING (ex. of a mongodb connection string: mongodb://localhost:27017/mydatabase)


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
