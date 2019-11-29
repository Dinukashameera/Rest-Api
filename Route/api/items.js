const express = require("express");
const router = express.Router();
const { Item } = require("../../models/items");

//getting item
router.get("/", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

//saving items to the database
router.post("/", async (req, res) => {
  const { name, itemType, price, color, size } = req.body;
  try {
    const newItem = new Item({
      name,
      itemType,
      price,
      color,
      size
    });

    const result = await newItem.save();
    res.send(result);
  } catch (e) {
    console.log(e);
  }
});

//updating an item
router.put("/:id", async (req, res) => {
  try {
    const updateItem = await Item.findById(req.params.id);
    if (!updateItem) res.send("no item available");

    //using destructuring
    const { name, itemType, price, color, size } = req.body;

    updateItem.set({
      name,
      itemType,
      price,
      color,
      size
    });

    updateItem.save();
    res.send(updateItem);
    console.log(updateItem);
  } catch (e) {
    res.send(e);
  }
});

//deleting an item
router.delete("/:id", async (req, res) => {
  try {
    const deleteItem = await Item.findById(req.params.id);
    if (!deleteItem) return res.send("no item available");

    deleteItem.remove();
    res.status(400).send(deleteItem);
    console.log(deleteItem, " Item deleted sucessfully");
  } catch (e) {
    res.send(e);
  }
});

//SORTING items
//change is done
//getting items according itemType

router.get("/:id", async (req, res) => {
  try {
    const watchItems = await Item.find({ itemType: req.params.id });

    if (!watchItems) res.send("no watch item available");

    res.send(watchItems);
    console.log(watchItems);
  } catch (e) {
    res.send(e);
  }
});

//sorting items according to the price
router.get("/price/:id", async (req, res) => {
  try {
    const result = null;
    //console.log(req.params.id)
    if (req.params.id == "hightolow") {
      result = await Item.find().sort({ price: -1 });
    } else if (req.params.id == "lowtohigh") {
      result = await Item.find().sort({ price: 1 });
      console.log(result);
    }
    res.status(200).send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
