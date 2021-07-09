// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const data = require('../dump');


router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})
router.get('/:id', (req, res) => {
    User.findById(req.params['id'])
        .then(users => res.json(users))
        .catch(err => console.log(err))
})
//Add User
router.post('/dump', (req, res) => {
    User.insertMany(data)
        .then(() => res.json({
            message: "Added dump data"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
})
//Add User
router.post('/', (req, res) => {
    const {email, password, firstName, lastName} = req.body;
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });
    newUser.save()
        .then(() => res.json({
            message: "Created account successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
})
//Modified User
router.put('/:id', (req, res) => {
    const {email, firstName, lastName} = req.body;
    const newUser ={
        firstName: firstName,
        lastName: lastName,
        email: email,
    };
    User.findByIdAndUpdate({ _id: req.params['id'] },{$set: newUser} )
        .then(() => res.json({
            message: "update successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
})
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params['id'])
        .then(() => res.json({
            message: "delete successfully"
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating account"
        }))
})
module.exports = router;