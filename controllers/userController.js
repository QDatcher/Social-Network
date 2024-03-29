
const { User, Thought } = require('../models');


module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .select('-__v')

            res.json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate('friends')
            .populate('thoughts');

            if(!user){
                return res.status(404).json({ message: 'No user with this id found'})
            }

            res.json({
                user,

            })
        } catch (err){
            console.log(err)
            return res.status(500).json(err);
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
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          {
            $set: req.body,
          },
          {
            runValidators: true,
            new: true,
          }
        );
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id found' });
        }
  
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId })
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id found' });
        }
  
        // BONUS: get ids of user's `thoughts` and delete them all
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and their thoughts deleted!' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    async addFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id found' });
        }
  
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
    // remove friend from friend list
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id found' });
        }
  
        res.json(user);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
}