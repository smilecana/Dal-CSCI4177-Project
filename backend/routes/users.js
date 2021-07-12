// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const data = require('../dump');
const mongoose = require("mongoose");

//All user list
router.get('/users', (req, res) => {
    try {
        User.find()
            .then(users => res.json({
                success: true,
                message: "Users retrieved",
                "users": users
            }))
            .catch(err => console.log(err))
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }

})
//find user by Id
router.get('/user/:id', (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params['id'])
    if (!isValidId) return res.status(400).send("Id is not valid")
    else {
        User.findById(req.params['id'])
            .then(users => res.json({
                success: true,
                "users": users
            }))
            .catch(e => {
                res.status(500).send({
                    success: false,
                    message: "Internal server error"
                })
            })
    }
})
//Add Multiple data
router.post('/dump', (req, res) => {
    User.insertMany(data)
        .then(() => res.json({
            message: "Added dump data"
        }))
        .catch(err => res.status(400).json({
            success: false,
            message: "Internal server error"
        }))
})
//Add User
router.post('/add', (req, res) => {
    const {email, password, firstName, lastName, title} = req.body;
    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        title: title
    });
    newUser.save()
        .then(() => res.status(201).send({
            success: true,
            message: "User added"
        }))
        .catch(err => res.status(500).send({
            success: false,
            message: "Internal server error"
        }))

})
//Modified User
router.put('/update/:id', (req, res) => {
    const {email, firstName, lastName} = req.body;
    const updateUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    };
    const isValidId = mongoose.Types.ObjectId.isValid(req.params['id'])
    if (!isValidId) return res.status(404).send("Users not found")
    else {
        User.findByIdAndUpdate({_id: req.params['id']}, {$set: updateUser})
            .then(() => res.status(200).send({
                success: true,
                message: "Users updated",
            }))
            .catch(err => res.status(500).json({
                success: false,
                message: "Internal server error"
            }))
    }
})
// Delete User
router.delete('/delete/:id', (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params['id'])
    if (!isValidId) return res.status(404).send("Users not found")
    else {
        User.findByIdAndRemove(req.params['id'])
            .then(() => res.json({
                success: true,
                message: "User deleted."
            }))
            .catch(err => res.status(500).json({
                error: err,
                success: false,
                message: "Internal server error"
            }))
    }
})
module.exports = router;