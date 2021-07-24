// users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');


//All user list

router.get('/', (req, res) => {
    try {
        let email = req.body;
        User.find({email: email})
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        success: false,
                        message: "No user found",
                    })
                }
                return res.send({
                    success: true,
                    "user": user
                })
            })
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
} )
//find user by Id

router.get('/:userId', (req, res) => {
    try {
        User.findById(req.params['userId'])
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
//Modified User
router.put('/:userId', (req, res) => {
    try {
        const {userName, bio,github,linkedin,web} = req.body;
        if (!userName) {
            return res.status(400).send({
                message: "Missing body params or check the params keys",
                success: false
            })
        }
        const updateUser = {
            userName: userName,
            bio: bio,
            github: github,
            linkedin: github,
            web: web
        };
        User.findByIdAndUpdate(req.params['userId'], {$set: updateUser}, function (err, model) {
            if (err) {
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
router.delete('/:userId', (req, res) => {
    try {
        User.findByIdAndRemove(req.params['userId'])
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