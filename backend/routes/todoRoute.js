const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.route("/create").post(todoController.createTodo);
router.route("/view").get(todoController.ViewAllTodos);
router.route("/delete/:taskId").delete(todoController.deleteTodo);
router.route("/complete/:taskId").put(todoController.completeTodoUpdate);

module.exports = router;
