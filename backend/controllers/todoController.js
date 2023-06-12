const {
  createTodo,
  removeTodo,
  searchTodo,
  updateTodoCompleted,
  getAllTodos,
} = require("../services/todoService");
module.exports = {
  createTodo: async(req, res) => {
    try {
      await createTodo(req.body);
      return res.status(201).send({
        message: "Task created successfully",
      });
    } catch (err) {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  },
  ViewAllTodos: async (req, res) => {
    try {
      const tasks = await getAllTodos();
      return res.status(200).send({
        tasks,
      });
    } catch (err) {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      if (!taskId)
        return res.status(400).send({
          message: "id should not be empty",
        });
      const searchedTodo = await searchTodo(taskId);
      if (!searchedTodo)
        return res.status(404).send({
          message: "todo not found",
        });
      await removeTodo(taskId);
      
      return res.status(200).send({
        message: "task deleted successfully",
      });
    } catch (err) {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  },
  completeTodoUpdate: async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const completeData = req.body.completed;
      if (!taskId)
        return res.status(400).send({
          message: "id should not be empty",
        });
      const searchedTodo = await searchTodo(taskId);
      if (!searchedTodo)
        return res.status(404).send({
          message: "todo not found",
        });

      await updateTodoCompleted(taskId, completeData);
      return res.status(200).send({
        message: "updated successfully",
      });
    } catch (err) {
      return res.status(500).send({
        message: "Something went wrong",
      });
    }
  },
};
