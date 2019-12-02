const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id
    },
    "jwtPrivateKey" //use config.get('jwtPrivateKey')
  );
  console.log(token)
  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
