const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userTemplate = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  pfp: {
    type: String,
    default: "",
  },

  posts: [],
  friends: [],
  friendRequests: [],

  isPrivate: {
    type: Boolean,
    default: false,
  },
});
userTemplate.plugin(uniqueValidator);

module.exports = mongoose.model("User", userTemplate);
