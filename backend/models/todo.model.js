const mongoose = require("mongoose");
var todoSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
  completedTime: {
    type: Date,
  },
  creationTime: {
    type: Date,
  },
});
const Todo = mongoose.model('TODO', todoSchema);

module.exports = Todo;
