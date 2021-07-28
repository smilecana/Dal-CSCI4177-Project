//Brady MacDonald

const router = require("express").Router();
const Assignment = require("../models/Assignment");
const mongoose = require("mongoose");

const multer = require('multer');
//const GridFsStorage = require('multer-gridfs-storage');

const upload = multer({ });

//Add file
router.post("/upload_file", upload.single('file'), (req, res) => {
  try {

    console.log(req.file);
    console.log(req.body.fileName);

    const assignmentNumber = req.body.assignmentNum;
    const fileName = req.body.fileName;
    const file = req.file;

    console.log(assignmentNumber);
    console.log(fileName);
    console.log(file);
    //Check input is not empty
    if (!fileName || !assignmentNumber) {
      return res.status(400).send({
        message: "Missing body",
        success: false,
      });
    }

    //Create and set values of Assignment object to be uploaded to database
    const newAssignment = new Assignment();
    newAssignment.assignmentNum = assignmentNumber;
    newAssignment.file = file;
    newAssignment.fileName = fileName;
    newAssignment.grade = "0";

    newAssignment
      .save()
      .then(() =>
        res.status(200).send({
          success: true,
          message: "Assignment added",
        })
      )
      .catch((e) => {
        console.error(e);

        return res.status(500).send({
          success: false,
          message: "Something went wrong.",
        });
      });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

router.get("/retrieve_assignments", (req, res) => {
  try {
    Assignment.find()
      .exec()
      .then((Assignment) => {
        if (!Assignment.length) {
          return res.status(404).send({
            success: false,
            message: "No assignment found",
          });
        }
        return res.status(200).send({
          success: true,
          message: "Assignment retrieved",
          Assignment: Assignment,
        });
      })
      .catch((e) => {
        console.error(e);
        return res.status(500).send({
          success: false,
          message: "Something went wrong",
        });
      });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});
module.exports = router;
