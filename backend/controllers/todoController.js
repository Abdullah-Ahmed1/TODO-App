const { getAllTasks, createTodo, removeTodo,searchTodo,updateTodoCompleted } = require("../dao/todoDao");
module.exports = {
  createTask: (req, res) => {
    console.log("reacheddddddddddddddddddddddd create task")
    try {
      createTodo(req.body);
      return res.status(201).send({
        message: "Task created successfully",
      });
    } catch (err) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
  ViewAllTodos: async(req, res) => {
    try {
      const tasks = await getAllTasks() ;
      return res.status(200).send({
        tasks,
      });
    } catch (err) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
  deleteTodo: (req, res) => {
    try {
      const taskId = req.params.taskId;
      if (!taskId)
        return res.status(400).send({
          message: "id should not be empty",
        });

      removeTodo(taskId);
        //condition for finding task to delete and check if it exist
      return res.status(200).send({
        message:"task deleted successfully"
      });
    } catch (err) {
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  },
  completeTodo: async(req,res)=>{
    try{
      const taskId = req.params.taskId;
      const completeData = req.body.complete
      if (!taskId)
      return res.status(400).send({
        message: "id should not be empty",
      });
      const searchedTodo = await searchTodo(taskId)
      if(!searchedTodo) return res.status(400).send({
        message: "todo not found",
      })

      await updateTodoCompleted(taskId,completeData)
      return res.status(200).send({
        message: "updated successfully",
      })

    }catch(err){
      return res.status(400).send({
        message: "Something went wrong",
      });
    }
  }
};
