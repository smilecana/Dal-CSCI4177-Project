// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
//All user list
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().exec();
        if (!users.length) {
            return res.status(404).send({
                success: false,
                message: "No user found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Users retrieved",
            "users": users,
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
})


module.exports = router;