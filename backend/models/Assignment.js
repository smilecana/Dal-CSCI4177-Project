//Brady MacDonald

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assignmentSchema = new Schema({
    assignmentNum: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    fileName:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Assignment", assignmentSchema, "assignments")