const mongoose = require("mongoose");
var todoSchema = new mongoose.Schema({
  Task: {
    type: String,
  },
  Completed: {
    type: Boolean,
  },
  CompletedTime: {
    type: Date,
  },
  CreationTime: {
    type: Date,
  },
});
mongoose.model("TODO", todoSchema);
