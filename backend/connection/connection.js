const mongoose = require("mongoose");
const config = require('../config')
try{
    mongoose.connect(
        config.dbUrl,
        { useNewUrlParser: true },
        
      );
      console.log("db connected successfully")
}catch(err){
    console.log(err)
}




module.exports = mongoose.connect;

require("../models/todo.model");