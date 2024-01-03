const mongoose = require("mongoose");

////////////  Todo schema  //////////////
const todoSchema = mongoose.Schema({
  todo: { type: String },
  isComplete: { type: Boolean },
});

const TodoModel = mongoose.model("todo", todoSchema);

module.exports = { TodoModel };
