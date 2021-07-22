//Brady MacDonald

const express = require('express');
const router = express.Router()
const Assignment = require('../models/Assignment');

module.exports = {
    create: function (req, res) {
        Assignment.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.status(422).json(err));
    },
};