const {Schema, model} = require('mongoose');

const userSchema = new Schema({
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
    },
    {
     toJSON: {
        virtuals: true,
      },
      id: false,
    }
);

userSchema
    .virtual('friendCount')
    .get(function(){
      return this.friends.length
    })


const User = model('User', userSchema);

module.exports = User;