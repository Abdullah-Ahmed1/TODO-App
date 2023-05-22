const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()


router.route('/create').post(todoController.createTask)
router.route('/view').get(todoController.ViewAllTodos)
router.route('/delete/:taskId').delete(todoController.deleteTodo)
router.route('/complete/:taskId').put(todoController.completeTodo)

module.exports = router

