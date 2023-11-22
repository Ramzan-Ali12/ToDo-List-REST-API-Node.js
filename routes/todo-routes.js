const express = require("express");
const todoRoutes = express.Router();
const {
  createTodo,
  updateTodo,
  viewTodo,
  deleteTodo,
  viewTodoById,
} = require("../controllers/todo-controller");

// add list route
todoRoutes.post("/create", createTodo);

// update list route
todoRoutes.put("/update/:id", updateTodo);

// Get all todo data
todoRoutes.get("/view", viewTodo);

// delete todo
todoRoutes.delete("/delete/:id", deleteTodo);

// get todo by id
todoRoutes.get("/view/:id/", viewTodoById);

module.exports = todoRoutes;
