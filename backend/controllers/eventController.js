//Ryan McInroy

const express = require('express');
const router = express.Router()
const Event = require('../models/Events');


module.exports = {
    findAll: function (req, res) {
        Event.find()
            .then(events => res.json(events))
            .catch(err => console.log(err))
    },
    create: function (req, res) {
        Event.create(req.body)
            .then(events => res.json(events))
            .catch(err => res.status(422).json(err));
    },
};