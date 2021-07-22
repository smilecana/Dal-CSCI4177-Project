//Brady MacDonald

const express = require('express');
const router = express.Router()
const Assignment = require('../models/Assignment');

//Define business logic for routes
module.exports = {
    findAll: function (req, res) {
        Assignment.find()
            .then(assignments => res.json(assignments))
            .catch(err => console.log(err))
    },
    create: function (req, res) {
        Assignment.create(req.body)
            .then(assignments => res.json(assignments))
            .catch(err => res.status(422).json(err));
    },
};