const express = require("express");
const { TodoModel } = require("../model/todo");

const TodoRoute = express.Router();

// Get/Read Todo
TodoRoute.get("/", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post/Create New Todo
TodoRoute.post("/", async (req, res) => {
  const { todo, isComplete } = req.body;

  if (!todo) {
    return res.status(400).json({ error: "Todo text is required" });
  }

  try {
    const newTodo = new TodoModel({ todo, isComplete: isComplete || false });
    await newTodo.save();
    res.status(201).json(newTodo);
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
