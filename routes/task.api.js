const express = require('express');
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTaskList);

router.get('/:id', taskController.getTask);

router.put('/:id', taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;