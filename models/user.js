const express = require("express");
const mongoose = require("mongoose");

const User = mongoose.model('User',new mongoose.Schema({
    name: {
        type:String,
        minlength:5,
        maxlength:20
    },
    email: {
      type: String,
      unique: true
    },
    password: {
        type:String,
        minlength:5,
        maxlength:1024
    }
  }));

exports.User = User;

