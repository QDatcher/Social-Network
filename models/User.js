const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        // Check if the 2 below are correct
        unique: true, 
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/
    },
    // figure out how to do this
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'thoughts',
        },
      ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Users',
        },
      ],
})