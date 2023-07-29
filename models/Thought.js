const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        //Need to recheck this code later to see if it is correct
        Date: { type: Date, default: Date.now }
        //Also see find the getter method they are referencing
    },
    username: {
        // I think this is correct but verify later
        type: String,
        required: true
    },
    // Gotta figure out what to put in the code below
    reactions: [reactionSchema]
})

thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema);

module.exports = Thought;