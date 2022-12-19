const { Thought } = require('../models');
const router = require('express').Router();

const thoughtController = {
    getThought(req, res) {
        Thought.find({})
            .select('-__v')
            .then(Thought => res.json(Thought))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found.' });
                    return;
                }
                res.json(Thought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    createNewThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate({ _id: params.userId },
                    { $push: { thought: _id } },
                    { new: true });
            })
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found.' });
                    return;
                }
                res.json(Thought)
            })
            .catch(err => res.json(err));
    },
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found.' });
                    return;
                }
                res.json(Thought);
            })
            .catch(err => res.status(400).json(err));
    },
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(Thought => {
                if (!Thought) {
                    res.status(404).json({ message: 'Thought not found.' });
                    return;
                }
                res.json(Thought);
            })
            .catch(err => res.status(400).json(err));
    },
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .then(data => {
                console.log(data);
                if (!data) {
                    res.status(404).json({ message: 'Thought not found.' });
                    return;
                }
                res.json(data);
            })
            .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true })
            .then(Thought => res.json(Thought))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;


