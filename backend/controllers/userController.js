const express = require('express');
const router = express.Router()
const User = require('../models/User');

// Defining all methods and business logic for routes

module.exports = {
    findAll: function (req, res) {
        User.find()
            .then(users => res.json(users))
            .catch(err => console.log(err))
    },
    create: function (req, res) {
        User.create(req.body)
            .then(newBook => res.json(newBook))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        User.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(book => res.json(book))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        User.findById({ _id: req.params.id })
            .then(book => book.remove())
            .then(allbooks => res.json(allbooks))
            .catch(err => res.status(422).json(err));
    }
};


