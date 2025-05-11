const fs = require('fs').promises;
const path = require('path');

const dbFilePath = path.join(__dirname, '../db.json');

class TodoModel {
  static async getAll() {
    try {
      const data = await fs.readFile(dbFilePath, 'utf8');
      const { todos } = JSON.parse(data);
      return todos;
    } catch (error) {
      console.error('Error reading todos:', error);
      throw error;
    }
  }

  static async getById(id) {
    const todos = await this.getAll();
    return todos.find(todo => todo.id === parseInt(id));
  }

  static async create(newTodo) {
    const todos = await this.getAll();
    const id = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const todo = { id, ...newTodo };
    todos.push(todo);
    await this.save(todos);
    return todo;
  }

  static async update(id, updatedFields) {
    let todos = await this.getAll();
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));

    if (todoIndex !== -1) {
      todos[todoIndex] = { ...todos[todoIndex], ...updatedFields };
      await this.save(todos);
      return todos[todoIndex];
    }
    return null;
  }

  static async delete(id) {
    let todos = await this.getAll();
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== parseInt(id));
    if (todos.length < initialLength) {
      await this.save(todos);
      return true;
    }
    return false;
  }

  static async save(todos) {
    try {
      await fs.writeFile(dbFilePath, JSON.stringify({ todos }, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving todos:', error);
      throw error;
    }
  }
}

module.exports = TodoModel;