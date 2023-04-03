const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req, res, next }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    console.log(token)
    
    // We split the token string into an array and return actual token
    //   if (req.headers.authorization) {
    //     token = token.split(' ').pop().trim();
    //   }

    // // verify token and get user data out of it
    // try {
    //   const decoded = jwt.verify(token, secret);
    //   req.user = decoded.data;
    //   next();
    // } catch (error) {
    //   console.log(error)
    //   res.status(401).json({ message: 'Unauthorized access.' });
    // }
},
  signToken: function ({ username, email, password, messages, friends, _id }) {
    const payload = { username, email, password, messages, friends, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
