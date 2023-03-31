// BACKEND REFERENCE

const { User, Message } = require('../models'); 

//adding bcrypt for user authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env; // Make sure to define SECRET_KEY in your environment variables.




module.exports = {

    // Get all Users
    getUsers(req, res) {
        User
            .find()
            .then((users) => res.json(users))
        // .toArray((err, results) => {
        //     if(err) throw err;
        //     res.send(results);
        // });
    },

    // Get a single User
    getSingleUser(req, res) {
        // find a user by it's Id
        User.findById(req.params.userId)
            // populate the message portion of User
            .populate('messages')
            // populate the friends portion of User
            .populate('friends')
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'No user found with that ID' });
                }
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },

    // create a User
// create a User - added bcrypt to hash the password
async createUser(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({ ...req.body, password: hashedPassword });
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

    // update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this ID exist' })
                }
                res.json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            })
    },
    // Authenticate a user (login)
async loginUser(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      res.status(500).json(err);
    }
  },

    // delete a User
    deleteUser(req, res) {
        User.deleteOne()
            .then(({ messages }) => {
                return Message.updateMany(
                    { _id: { $in: messages } },
                    { $pull: { replys: { username: req.params.userId } } },
                    { new: true }
                );
            })
            .then(() => {
                return User.findOneAndDelete({ _id: req.params.userId });
            })
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'No user found with that ID' });
                }
                else {
                    res.json({ message: 'User was successfully deleted' })
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // add friends
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { new: true },
        )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User cannot add friend, because they or the user they want to add does not exist.' })
                }
                res.json({ message: 'Friend was successfully added' })
            })

    },

    // remove friends
    removeFriend(req, res) {
        User.findById(req.params.userId)
            // calling the found user current_user and passing it through the process
            .then((current_user) => {
                if (!current_user) {
                    res.status(404).json({ message: 'User not found' });
                }
                else {
                    // pull is what allows us to take something out of an array. In this case, our friends_list
                    current_user.friends.pull(req.params.friendId)
                    return current_user.save()
                }
            })
            .then(() => {
                res.json({ message: 'Friend was successfully removed' });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
} 