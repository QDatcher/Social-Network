const mongoose = require('mongoose');

const reactionSchema = mongoose.Schema({
    reactionId: {

    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
         //Need to recheck this code later to see if it is correct
         Date: { type: Date, default: Date.now }
         //Also see find the getter method they are referencing 
    }
})