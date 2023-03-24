const { Schema, model } = require('mongoose');
const replySchema = require('./Reply');  

const messageSchema = new Schema({

    MessageText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (timestamp) {
            return new Date(timestamp).toLocaleString();
        }
    },
    username: {
        type: String,
        required: true,
        ref: `User`
        // use VVVVV if needed to populate the field with a certain item
        // Thought.find().populate('username').exec(function(err, thoughts) {
        // });
    },
    reply: [replySchema]
},
{
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

messageSchema.virtual('reactionCount').get(function () {
    return this.reply.length;
});
const Message = model('Message', messageSchema)



module.exports = Message;

