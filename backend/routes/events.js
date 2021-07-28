//Ryan McInroy
const router = require('express').Router();
const Event = require('../models/events');
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

//Add Event
router.post('/add_event', (req, res) => {
    try {
        const eventName = req.body.assignmentNum;
        const eventDate = req.body.file;

        //Check if the input is empty
        if (!eventName || !eventDate) {
            return res.status(400).send({
                message: "Missing body",
                success: false
            })
        }
        
        const newEvent = new Event();
        newEvent.name = eventName;
        newEvent.date = eventDate;
    
        newEvent.save()
            .then(() => res.status(200).send({
                success: true,
                message: "Event added"
            }))
            .catch(e => {
                return res.status(500).send({
                    success: false,
                    message: "Failed."
                })
            })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
})
module.exports = router;