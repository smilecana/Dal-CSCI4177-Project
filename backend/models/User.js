const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
  },
  image: {
    type: String,
  },
  github: {
    type: String,
  },
  web: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  bio: {
    type: String,
  },

});
module.exports = mongoose.model("User", userSchema, "users");
