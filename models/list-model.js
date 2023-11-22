const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  create_date: {
    type: Date,
    require: true,
  },
  update_date: {
    type: Date,
    require: true,
  },
  //  relationship b/w list model and todo model
  todo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ToDo",
  },
  status: {
    type: Boolean,
    default: false,
    require: true,
  },
});
const todoList = mongoose.model("list", listSchema);
module.exports = todoList;
