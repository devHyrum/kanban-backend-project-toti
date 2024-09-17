import  db from '../config/db.js'

const Task = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM tasks')
    return rows
  },

  create: async (title, description, dueDate, status, priority, userId, categoryId, taskListId, filePath) => {
    const result = await db.query(
      'INSERT INTO tasks (title, description, due_date, status, priority, user_id, category_id, task_list_id, file_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, dueDate, status, priority, userId, categoryId, taskListId, filePath]
    )
    return result
  }
}

module.exports = Task
