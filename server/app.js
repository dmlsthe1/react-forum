const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/throwaway";

require("./models/User");

mongoose.connect(MONGODB_URI)

const app = express();

app.use(bodyParser.json());

app.post("/api/form", async (req, res) => {
  const User = mongoose.model("User");
  const user = await User.create({...req.body});
  res.json(user);
});

app.get("/api/users", async (req, res) => {
  const User = mongoose.model("User");
  const users = await User.find({});
  res.json(users);
})

module.exports = app;