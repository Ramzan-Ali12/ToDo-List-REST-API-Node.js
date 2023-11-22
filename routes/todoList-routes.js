const express = require("express");
const listRoutes = express.Router();
const {
  createList,
  updateList,
  deleteList,
  viewList,
  viewListById,
} = require("../controllers/list-controller");

// add todoList route
listRoutes.post("/create", createList);

// update todoList route
listRoutes.put("/update/:id/", updateList);

// delete todoList route
listRoutes.delete("/delete/:id/", deleteList);

// view list route
listRoutes.get("/view", viewList);

// view list by Id
listRoutes.get("/view/:id/", viewListById);

module.exports = listRoutes;
