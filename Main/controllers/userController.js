const { User, Thought, Reaction } = Require('../models');
const router = require('express').Router();

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(User => res.json(User))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'ID not found.' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.status(400).json(err));
    },

    createUser({ body }, res) {
        User.create(body)
            .then(User => res.json(User))
            .catch(err => res.status(400).json(err));
    },
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'ID not found.' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'ID not found.' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true })

            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'ID not found.' });
                    return;
                }
                res.json(User);
            })
            .catch(err => res.json(err));
    },
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true })
            .then(User => {
                if (!User) {
                    res.status(404).json({ message: 'ID not found.' });
                    return;
                }
                res.json(User)
            })

            .catch(err => res.json(err));
    },
};

module.exports = userController;

