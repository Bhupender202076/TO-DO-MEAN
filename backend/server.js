const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const path = require("path");

//mongodb+srv://bhupender:<password>@cluster0.eo1u1.mongodb.net/?retryWrites=true&w=majority
//mongodb+s rv://bhupender:bhupender@cluster0.eo1u1.mongodb.net/?retryWrites=true&w=majority
// mongoose.connect('mongodb+srv://bhupender:bhupender@cluster0.eo1u1.mongodb.net/?retryWrites=true&w=majority').then(()=>{
mongoose
  .connect(process.env.MONGODB_ATLAS_URL)
  .then(() => {
    console.log(`connect successfully: ${process.env.MONGODB_ATLAS_URL}`);
  })
  .catch((err) => {
    console.log("problem in connect", err.message, err);
  });

const app = express();
const port = process.env.PORT || 3000;

let tasks = require("./routes/tasks/");
let users = require("./routes/users/");

app.use("/images", express.static(path.join("images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin,X-Requested-With,Content-Type,Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.port = port;

app.use("/api/tasks/", tasks);
app.use("/api/users/", users);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
