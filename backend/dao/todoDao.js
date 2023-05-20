const Mongoose = require("mongoose");
const Todo = Mongoose.model("TODO");
module.exports = {

    createTask : async(body)=>{
        try{
            await Todo.create(body)
        }catch(err){
            console.log(err)    
        }
    },

  getAllTasks: async () => {
    try {
      const tasks = await Todo.find({});
      return tasks;
    } catch (err) {
      console.log(err);
    }
  },

  deleteTask : async(id)=>{
    try{
        await Todo.deleteOne({
            _id:id
        })
    }catch(err){
        console.log(err)
    }
  }
};
