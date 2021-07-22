//Brady MacDonald

const router = require('express').Router();
const Assignment = require('../models/Assignment');
const mongoose = require("mongoose");

//Add file
router.post('/upload_file', (req, res) => {
    try {
        const assignmentNumber = req.body.assignmentNum;
        const file = req.body.file;
        const fileName = req.body.fileName;
        console.log(req.body.fileName);
        console.log(req.body.assignmentNum)
        /*if (!file || !fileName || !assingmentNum) {
            return res.status(400).send({
                message: "Missing body",
                success: false
            })
        }*/
        const newAssignment = new Assignment();
        newAssignment.assignmentNum = assignmentNumber;
        newAssignment.file = file;
        newAssignment.fileName = fileName;
        newAssignment.grade = '0';

        newAssignment.save()
            .then(() => res.status(200).send({
                success: true,
                message: "Assignment added"
            }))
            .catch(e => {
                console.log("Testing_: ", e)
                return res.status(500).send({
                    success: false,
                    message: "Something went wrong."
                })
            })
    } catch (e) {
        console.log("TESTING!!!!!!!!!!: ", e)
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
})
module.exports = router;