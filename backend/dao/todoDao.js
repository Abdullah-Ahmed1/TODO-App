const Mongoose = require("mongoose");
const Todo = Mongoose.model("TODO");
module.exports = {

    createTodo : async(body)=>{
        try{
            await Todo.create(body)
        }catch(err){
            console.log(err)    
        }
    },

  getAllTodos: async () => {
    try {
      const tasks = await Todo.find({});
      console.log(tasks)
      return tasks;
    } catch (err) {
      console.log(err);
    }
  },

  removeTodo : async(id)=>{
    try{
        await Todo.deleteOne({
            _id:id
        })
    }catch(err){
        console.log(err)
    }
  },
  searchTodo:async(taskId)=>{
    try{
      const todo =  await Todo.findOne({
        _id:taskId
    })

    return todo
    }catch(err){
      console.log(err)
    }
  },
  updateTodoCompleted:(taskId,completed)=>{
    try{
      Todo.findByIdAndUpdate(
        {_id:taskId},
        {completed:completed}
      )
    }catch(err){
      console.log(err)
    }
  }
};
