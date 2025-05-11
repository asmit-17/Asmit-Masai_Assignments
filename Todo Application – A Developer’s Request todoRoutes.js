const express = require('express');
const TodoController = require('../controllers/todoController');
const router = express.Router();

router.get('/todos', TodoController.getAllTodos);
router.get('/todos/search', TodoController.searchTodos);
router.post('/todos', TodoController.createTodo);
router.put('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

module.exports = router;