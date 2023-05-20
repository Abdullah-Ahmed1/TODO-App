const { getAllTasks, createTask, deleteTask } = require("../dao/todoDao");
module.exports = {
  createTask: (req, res) => {
    try {
      createTask(req.body);
      return res.status(201).send({
        message: "Task created successfully",
      });
    } catch (err) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
  ViewAllTasks: (req, res) => {
    try {
      const tasks = getAllTasks();
      return res.status(200).send({
        message: "Task created successfully",
      });
    } catch (err) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
  deleteTask: (req, res) => {
    try {
      const id = req.params.id;
      if (!id)
        return res.status(400).send({
          message: "id should not be empty",
        });

      deleteTask(id);

      return res.status(200).send({
        message:"task deleted successfully"
      });
    } catch (err) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
};
