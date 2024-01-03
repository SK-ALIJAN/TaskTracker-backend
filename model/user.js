const mongoose = require("mongoose");

////////////  Todo schema  //////////////
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };
