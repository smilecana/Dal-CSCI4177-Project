const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
})
module.exports = mongoose.model("User", userSchema, "users")