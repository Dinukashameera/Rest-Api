const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

//getting user
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
    console.log(user);
  } catch (e) {
    console.log(e);
  }
});

//saving a user
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    //destructuring the req body
    const { name, email, password } = req.body;
    //checking whether the user with same email address exist
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const result = await user.save();

    const token = user.generateAuthToken();
    // console.log(token)
    res.header("x-auth-token", token).send(user);
    console.log(result);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
