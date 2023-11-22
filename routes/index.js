const express = require("express");
const route = express.Router();

const todoRoutes = require("./todo-routes");
const listRoutes = require("./todoList-routes");
// todo routes
route.use("/todo", todoRoutes);
// list routes
route.use("/list", listRoutes);

module.exports = route;
