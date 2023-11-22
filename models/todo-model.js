const mongoose = require("mongoose");

// create a todo Schema
const ToDoSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
});
const Todo = mongoose.model("ToDo", ToDoSchema);
module.exports = Todo;
