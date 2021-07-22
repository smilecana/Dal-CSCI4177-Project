// index.js
const router = require('express').Router();
const userRoutes = require('./users');
const fileRouters = require('./assignments');
const User = require('../models/User');

const bcrypt = require("bcryptjs")
const jsonwebtoken = require('jsonwebtoken');

router.use('/api/user', userRoutes);
router.use('/api', fileRouters);

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                const token = jsonwebtoken.sign({id: user.id, email: user.email}, process.env.PUBLIC_TOKEN_KEY);
                res.status(200).json({
                    token: token,
                    message: "login succeed"
                })
            } else {
                res.status(400).json({
                    error: "login failed"
                })
            }
        } else {
            res.status(401).json({
                error: "User does not exist"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
})
//logout
router.post('/logout', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "logout succeed",
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
})
//signUp
router.post('/signup', async (req, res) => {
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
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        newUser.save()
            .then(() => res.status(200).send({
                success: true,
                message: "User added"
            }))
            .catch(e => {
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
        if (e.code === 11000) {
            return res.status(500).send({
                success: false,
                message: "Email address already exists."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
})

module.exports = router;