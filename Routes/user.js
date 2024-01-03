const express = require("express");
const { UserModel } = require("../model/user");
let jwt = require("jsonwebtoken");

const UserRoute = express.Router();

UserRoute.post("/", async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!name) res.status(400).json({ error: "Name must be filled!" });
    let newData = new UserModel({ name, email });
    await newData.save();
    let token = jwt.sign({ userId: newData._id, todoUser });
    res.json({ message: "seccessfully created", data: newData, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = { UserRoute };
