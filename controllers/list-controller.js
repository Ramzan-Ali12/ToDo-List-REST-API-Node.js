const todoList = require("../models/list-model");
const { listServices } = require("../services");
const { Status } = require("../controllers/index");
// create list
const createList = async (req, res) => {
  try {
    const { name, create_date, todo_id, status } = req.body;
    // call the createListService
    const createService = await listServices.createListService({
      name,
      create_date,
      todo_id,
      status,
    });
    return res.status(createService.status).send(createService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};
// updateList Service
const updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, update_date, status } = req.body;
    // call updateListService
    const updateService = await listServices.updateListService({
      id,
      name,
      update_date,
      status,
    });
    res.status(updateService.status).send(updateService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};

// view all the list
const viewList = async (req, res) => {
  try {
    // call the viewListService
    const viewService = await listServices.viewListService();
    res.status(viewService.status).send(viewService);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};
// view list by id
const viewListById = async (req, res) => {
  try {
    const id = req.params.id;
    // call the viewListByIdService
    const viewByIdService = await listServices.viewListByIdService(id);
    res.status(viewByIdService.status).send(viewByIdService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};
// delete the list
const deleteList = async (req, res) => {
  try {
    const id = req.params.id;
    // call the deleteListService
    const deleteService = await listServices.deleteListService(id);
    res.status(deleteService.status).send(deleteService);
  } catch (error) {
    console.error(error);
    res.status(Status.ERROR.INTERNAL_SERVER_ERROR).json({
      status: "failed",
      message: "Internal Server Error!",
    });
  }
};

module.exports = { createList, updateList, viewList, viewListById, deleteList };
