const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()


router.route('/create').post(todoController.createTask)
router.route('/view').get(todoController.ViewAllTasks)
router.route('/delete/:id').delete(todoController.deleteTask)

module.exports = router

