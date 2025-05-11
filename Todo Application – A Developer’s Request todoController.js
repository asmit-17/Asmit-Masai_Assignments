const TodoModel = require('../models/todoModel');

class TodoController {
  static async getAllTodos(req, res) {
    try {
      const todos = await TodoModel.getAll();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve todos' });
    }
  }

  static async searchTodos(req, res) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Search query "q" is required' });
      }
      const todos = await TodoModel.getAll();
      const results = todos.filter(todo =>
        todo.title.toLowerCase().includes(q.toLowerCase())
      );
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search todos' });
    }
  }

  static async createTodo(req, res) {
    try {
      const { title, completed } = req.body;
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      const newTodo = await TodoModel.create({ title, completed: completed || false });
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }

  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const updatedTodo = await TodoModel.update(id, req.body);
      if (updatedTodo) {
        res.status(200).json(updatedTodo);
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const deleted = await TodoModel.delete(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Todo not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
}

module.exports = TodoController;