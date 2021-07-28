//Ryan McInroy
const router = require('express').Router();
const Event = require('../models/Event');


router.get('/events', (req, res) => {
    Event.find()
        .then(event => {
            if (!event) {
                return res.status(404).send({
                    success: false,
                    message: "No user found",
                })
            }
            return res.send({
                success: true,
                "events": event
            })
        })
} )
//Add Event
router.post('/event', async (req, res) => {
    try {
        const eventTitle = req.body.title;
        const eventDate = req.body.date;

        //Check if the input is empty
        if (!eventTitle || !eventDate) {
            return res.status(400).send({
                message: "Missing body",
                success: false
            })
        }
        
        const newEvent = new Event();
        newEvent.title = eventTitle;
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