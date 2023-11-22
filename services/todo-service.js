const Todo = require("../models/todo-model");
const todoList = require("../models/list-model");
const { Status } = require("../controllers/index");
// create createTodoService
const createTodoService = async ({ name }) => {
  try {
    if (!name) {
      return {
        msg: `Todo can't be empty!`,
        status: Status.ERROR.NOT_FOUND,
      };
    }
    const todo = await Todo.create({ name });
    return {
      msg: "Todo created Successfully!",
      todo_id: todo.id,
      status: Status.SUCCESS.CREATED,
    };
  } catch (error) {
    throw error;
  }
};

// updateTod service
const updateTodoService = async ({ id, name }) => {
  try {
    if (!name) {
      return {
        msg: "ToDo can't be empty",
        status: Status.ERROR.NOT_FOUND,
      };
    }
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name: name },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    if (!updatedTodo) {
      return {
        msg: `Cannot update todo with that id ${id}!`,
        status: Status.ERROR.NOT_FOUND,
      };
    }
    return {
      status: Status.SUCCESS.OK,
      msg: "Todo updated successfully!",
      todo_id: updatedTodo.id,
    };
  } catch (error) {
    throw error;
  }
};
// viewTodo service
const viewTodoService = async () => {
  try {
    const data = await Todo.find();
    if (!data || data?.length === 0) {
      return {
        status: Status.ERROR.NOT_FOUND,
        msg: "Data not found!",
      };
    }
    return { status: Status.SUCCESS.OK, todo: data };
  } catch (error) {
    throw error;
  }
};

// viewTodoById Service
const viewTodoByIdService = async (viewTodoId) => {
  try {
    const data = await Todo.findById(viewTodoId);
    if (!data || data?.length === 0) {
      return {
        status: Status.ERROR.NOT_FOUND,
        msg: `Data not found!`,
      };
    }
    return { status: Status.SUCCESS.OK, todo: data };
  } catch (error) {
    throw error;
  }
};
// deleteTodo Service
const deleteTodoService = async (todoId) => {
  try {
    // call the list model and delete associated items with todo
    await todoList.deleteMany({ todo_id: todoId });
    // delete the todo
    const deleteById = await Todo.findByIdAndDelete(todoId);
    if (!deleteById) {
      return {
        status: Status.ERROR.NOT_FOUND,
        msg: `Todo not deleted!`,
      };
    }
    return {
      status:Status.SUCCESS.OK,
      msg: "Todo was deleted Successfully!",
    };
  } catch (error) {
    throw error;
  }
};
// export the todoServices
module.exports = {
  createTodoService,
  updateTodoService,
  viewTodoService,
  viewTodoByIdService,
  deleteTodoService,
};
