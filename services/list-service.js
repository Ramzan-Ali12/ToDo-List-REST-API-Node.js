const todoList = require("../models/list-model");
const { Status } = require("../controllers/index");

// createList service
const createListService = async ({ name, create_date, todo_id, status }) => {
  try {
    if (!name || !create_date || !todo_id || !status) {
      return {
        msg: "list can't be empty!",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    // save the todo in db
    const list = await todoList.create({ name, create_date, todo_id, status });
    return {
      msg: "list created Successfully!",
      status: Status.SUCCESS.CREATED,
      list_id: list.id,
    };
  } catch (error) {
    throw error;
  }
};

// updateList Service
const updateListService = async ({ id, name, update_date, status }) => {
  try {
    if (!name || !update_date || !status) {
      //   throw Error("List can't be empty!");
      return {
        msg: "List can't be empty!",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    const updatedList = await todoList.findByIdAndUpdate(
      id,
      { name: name, update_date: update_date, status },

      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (!updatedList) {
      return {
        msg: "Id not found!",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    return {
      msg: "list Updated Successfully!",
      status: Status.SUCCESS.OK,
      updatedList: updatedList.id,
    };
  } catch (error) {
    throw error;
  }
};

// viewList Service
const viewListService = async () => {
  try {
    const data = await todoList.find();
    if (!data || data?.length === 0) {
      return {
        msg: "Data not found!",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    return {
      msg: "Data found Successfully!",
      status: Status.SUCCESS.OK,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

// viewListById service
const viewListByIdService = async (id) => {
  try {
    const data = await todoList.findById(id);
    if (!data || data?.length === 0) {
      return {
        msg: "Data not found!",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    return {
      msg: "Data found Successfully!",
      status: Status.SUCCESS.OK,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

// deleteList service
const deleteListService = async (id) => {
  try {
    const deletedList = await todoList.findByIdAndDelete(id);
    if (!deletedList) {
      return {
        msg: "list can't be deleted!",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    return {
      msg: "List was deleted Successfully!",
      status: Status.SUCCESS.OK,
      list: deletedList.id,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createListService,
  updateListService,
  viewListService,
  viewListByIdService,
  deleteListService,
};
