const express = require("express");
const { TodoModel } = require("../model/todo");
let jwt = require("jsonwebtoken");
const TodoRoute = express.Router();

// Get/Read Todo
TodoRoute.get("/", async (req, res) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, "todoUser", async (err, decode) => {
        if (err) res.status(200).json({ message: err.message });
        else {
          let { userId } = decode;
          const todos = await TodoModel.find({ userId });
          res.json(todos);
        }
      });
    } else res.status(200).json({ message: "please Provided token " });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post/Create New Todo
TodoRoute.post("/", async (req, res) => {
  const { todo, isComplete } = req.body;
  const token = req?.headers?.authorization?.split(" ")[1];

  try {
    if (token) {
      if (!todo) res.status(400).json({ error: "Todo text is required" });
      jwt.verify(token, "todoUser", async (err, decode) => {
        if (err) res.status(200).json({ message: err.message });
        let { userId } = decode;
        let newObj = {
          todo,
          isComplete: isComplete || false,
          userId,
        };
        const newTodo = new TodoModel(newObj);
        await newTodo.save();
        res.status(201).json(newTodo);
      });
    } else res.status(200).json({ message: "please Provided token " });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Patch/Update existing Todo
TodoRoute.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { todo, isComplete } = req.body;

  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { todo, isComplete },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Deleting Todo
TodoRoute.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  TodoRoute,
};
