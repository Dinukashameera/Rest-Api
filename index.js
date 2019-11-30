const express = require("express");
const mongoose = require("mongoose");

const items = require("./Route/api/items");
const users = require('./Route/api/users')
const app = express();

app.use(express.json());
app.use("/api/items", items);
app.use("/api/users",users)
//connecting to the dataBase
mongoose
  .connect("mongodb://localhost/shopMart", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to mongo DB"))
  .catch(() => console.error(error));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening to PORT ${PORT}`));
