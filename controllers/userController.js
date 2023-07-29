
const { User, Thought } = require('../models');





module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v');

            if(!user){
                return res.status(404).json({ message: 'No user with this id found'})
            }

            res.json({
                user,

            })
        } catch (err){
            console.log(err)
            return res.status
        }
    },
    async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
          const user = await User.findOneAndRemove({ _id: req.params.userId });
    
          if (!user) {
            return res.status(404).json({ message: 'No such user exists' });
          }
    
          const thought = await Thought.findOneAndUpdate(
            { students: req.params.userId },
            { $pull: { users: req.params.userId } },
            { new: true }
          );
    
          if (!thought) {
            return res.status(404).json({
              message: 'Student deleted, but no thoughts found',
            });
          }
    
          res.json({ message: 'Student successfully deleted' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },
}