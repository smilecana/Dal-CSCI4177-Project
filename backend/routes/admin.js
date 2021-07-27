// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
module.exports = router;