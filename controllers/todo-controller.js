const Todo = require("../models/todo-model");
const { todoServices } = require("../services");
const { Status } = require("../controllers/index");
// create the todo list

const createTodo = async (req, res) => {
  try {
    const { name } = req.body;
    const createService = await todoServices.createTodoService({ name });
    return res
      .status(createService.status || Status.SUCCESS.CREATED)
      .send(createService);
  } catch (error) {
    console.log(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};

// update the todo list
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    // call the updateTodo Service
    const updateService = await todoServices.updateTodoService({ id, name });

    return res.status(updateService.status).send(updateService);
  } catch (error) {
    console.log(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};

// view all the todo
const viewTodo = async (req, res) => {
  try {
    // call the viewTodoService
    const viewService = await todoServices.viewTodoService();
    return res.status(viewService.status).send(viewService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};

// view todo by id
const viewTodoById = async (req, res) => {
  try {
    const viewTodoId = req.params.id;
    // call the viewTodoByIdService
    const viewByIdService = await todoServices.viewTodoByIdService(viewTodoId);
    return res.status(viewByIdService.status).send(viewByIdService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};
// delete the todo
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;

    // call the deleteTodoService
    const deleteService = await todoServices.deleteTodoService(todoId);
    res.status(deleteService.status).send(deleteService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  viewTodo,
  deleteTodo,
  viewTodoById,
};
