const mongoose = require("mongoose");

////////////  Todo schema  //////////////
const todoSchema = mongoose.Schema({
  todo: { type: String },
  isComplete: { type: Boolean },
  userId: { type: String },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };
