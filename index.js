const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

//connecting to the dataBase
mongoose
  .connect("mongodb://localhost/shopMart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to mongo DB"))
  .catch(() => console.error(error));

//items Schema
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

//getting item
app.get("/api/items", async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

//saving items to the database
app.post("/api/items", async (req, res) => {
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
app.put("/api/items/:id", async (req, res) => {
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
    console.log(updateItem)
  } catch (e) {
    res.send(e);
  }
});


//deleting an item
app.delete('/api/items/:id', async(req,res) => {
  try{
    const deleteItem = await Item.findById(req.params.id);
  if(!deleteItem) return res.send('no item available')

  deleteItem.remove();
  res.status(400).send(deleteItem);
  console.log(deleteItem, ' Item deleted sucessfully')
  }catch(e){
    res.send(e)
  }
  
})


//SORTING items
//change is done
//getting items according itemType

app.get('/api/items/:id',async(req,res) => {
  try{
    const watchItems = await Item
    .find({itemType : req.params.id})

    if(!watchItems) res.send('no watch item available')

    res.send(watchItems);
    console.log(watchItems)
    
  }catch(e)
  {
    res.send(e);
  }
})

//sorting items according to the price
app.get('/api/items/price/:id',async(req,res) => {
  try{

    const result = null;
    //console.log(req.params.id)
    if(req.params.id == 'hightolow'){
     result = await Item
    .find()
    .sort({price : -1})
    }
    else if(req.params.id == 'lowtohigh'){
      result = await Item
      .find()
      .sort({price : 1})
      console.log(result);
    }
    res.status(200).send(result);
    
    
  }catch(e)
  {
    res.status(404).send(e)
  }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
