const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const config = require('config')
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
    //getting the details of the user having the email is password
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();
    //sending the generated token
    res.send(token);



  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
