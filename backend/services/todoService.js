const Todo = require("../models/todo.model");
module.exports = {
  createTodo: async (body) => {
    try {
      await Todo.create(body);
    } catch (err) {
      console.log(err);
    }
  },

  getAllTodos: async () => {
    try {
      const tasks = await Todo.find({});
      return tasks;
    } catch (err) {
      console.log(err);
    }
  },

  removeTodo: async (id) => {
    try {
      await Todo.deleteOne({
        _id: id,
      });
    } catch (err) {
      console.log(err);
    }
  },
  searchTodo: async (taskId) => {
    try {
      const todo = await Todo.findOne({
        _id: taskId,
      });

      return todo;
    } catch (err) {
      console.log(err);
    }
  },
  updateTodoCompleted: async (taskId, completed) => {
    try {
      if (completed === true) {
        await Todo.findByIdAndUpdate(
          { _id: taskId },
          { completed: completed, completedTime: new Date() }
        );
      } else {
        await Todo.findByIdAndUpdate(
          { _id: taskId },
          { completed: completed, completedTime: null }
        );
      }
    } catch (err) {
      console.log(err);
    }
  },
};
