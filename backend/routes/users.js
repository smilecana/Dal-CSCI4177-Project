// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');


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
router.post('/', (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    const newUser = new User({
        firstname: firstname,
        lastname: lastname,
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
    const {email, firstname, lastname} = req.body;
    const newUser ={
        firstname: firstname,
        lastname: lastname,
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