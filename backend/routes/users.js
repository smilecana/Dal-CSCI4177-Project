// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const data = require('../dump');
const mongoose = require("mongoose");

//All user list
router.get('/users', (req, res) => {
    try {
        User.find().exec().then(users => {
            if (!users.length) {
                return res.status(404).send({
                    success: false,
                    message: "No user found",
                })
            }
            return res.status(200).send({
                success: true,
                message: "Users retrieved",
                "users": users
            })
        })
            .catch(e => {
                    console.error(e);
                    return res.status(500).send({
                        success: false,
                        message: "Something went wrong"
                    })
                }
            )
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }

})
//find user by Id
router.get('/user/:id', (req, res) => {
    try {
        User.findById(req.params['id'])
            .then(users => {
                if (!users) {
                    return res.status(404).send({
                        success: false,
                        message: "No user found",
                    })
                }
                return res.send({
                    success: true,
                    "users": users
                })
            })
            .catch(e => {
                    console.error(e);
                    return res.status(500).send({
                        success: false,
                        message: "Something went wrong"
                    })
                }
            )
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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
    try {
        const {email, userName, password, type} = req.body;
        if (!email || !password || !userName) {
            return res.status(400).send({
                message: "Missing body params or check the params keys",
                success: false
            })
        }
        const newUser = new User({
            userName,
            email,
            password,
            type
        });

        newUser.save()
            .then(() => res.status(200).send({
                success: true,
                message: "User added"
            }))
            .catch(e => {
                console.error(e)
                if (e.code === 11000) {
                    return res.status(500).send({
                        success: false,
                        message: "Email address already exists."
                    })
                }
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong."
                })
            })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }


})
//Modified User
router.put('/update/:id', (req, res) => {
    try {
        const {email, userName, password, type} = req.body;
        if (!email || !password || !userName) {
            return res.status(400).send({
                message: "Missing body params or check the params keys",
                success: false
            })
        }
        const updateUser = {
            userName: userName,
            email: email,
            type: type
        };
        User.findByIdAndUpdate(req.params['id'], {$set: updateUser}, function (err, model) {
            if (err) {
                if (err.code === 11000) {
                    console.error('db', err);
                    return res.status(500).send({
                        success: false,
                        message: "Email address already exists."
                    })
                }
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong"
                })
            }
            if (!model) return res.status(404).send({
                success: false,
                message: "No user found",
            })
            return res.status(200).send({
                success: true,
                message: "Users updated",
            })
        })
    } catch (e) {
        console.error(e);
        return res.status(500).send({
            success: false,
            message: "Internal server error",
        })
    }
})
// Delete User
router.delete('/delete/:id', (req, res) => {
    try {
        User.findByIdAndRemove(req.params['id'])
            .then(() => {
                return res.status(200).send({
                    success: true,
                    message: "User deleted."
                })
            })
            .catch(e => {
                console.error(e);
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong"
                })
            })
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }

})
module.exports = router;