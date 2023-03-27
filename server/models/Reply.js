const { Schema, model } = require('mongoose');

const replySchema = new Schema({
    replyID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    replyBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: timestamp => dateFormat(timestamp)
    }
});


module.exports = replySchema;