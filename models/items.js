const express = require("express");
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    itemType: {
      type: String,
      require: true
    },
    price: Number,
    addedDate: {
      type: Date,
      default: Date.now
    },
    color: [String],
    size: String
  });
  
  //items model
  const Item = mongoose.model("Item", itemSchema);
  

  exports.Item = Item;