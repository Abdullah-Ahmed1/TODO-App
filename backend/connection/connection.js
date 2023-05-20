const mongoose = require("mongoose");
try{
    mongoose.connect(
        process.env.DATABASE_URL,
        { useNewUrlParser: true },
        
      );
      console.log("db connected successfully")
}catch(err){
    console.log(err)
}




module.exports = mongoose.connect;

require("../models/todo.model");