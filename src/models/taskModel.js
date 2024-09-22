import { pool } from '../config/db.js'

export const Task = {
  getAllTasks: async () => {
    const [rows] = await pool.query(`
      SELECT 
        tasks.id, 
        tasks.title, 
        tasks.due_date, 
        tasks.status, 
        tasks.priority, 
        users.name AS user_name, 
        users.user_photo, 
        categories.name AS category_name, 
        task_lists.name AS task_list_name
      FROM 
        tasks
      LEFT JOIN users ON tasks.user_id = users.id
      LEFT JOIN categories ON tasks.category_id = categories.id
      LEFT JOIN task_lists ON tasks.task_list_id = task_lists.id
    `)
    return rows
  },
  getTaskById: async (id) => {
    const [task] = await pool.execute(`
      SELECT 
        tasks.id, 
        tasks.title,
        tasks.description,
        tasks.created_at,
        tasks.due_date,
        tasks.status,
        tasks.priority,
        tasks.file_path,
        users.name AS user_name, 
        users.user_photo, 
        categories.name AS category_name, 
        task_lists.name AS task_list_name
      FROM 
        tasks
      LEFT JOIN users ON tasks.user_id = users.id
      LEFT JOIN categories ON tasks.category_id = categories.id
      LEFT JOIN task_lists ON tasks.task_list_id = task_lists.id
      WHERE 
        users.id = ?
    `, [id])
    return task[0]
  },

  createTask: async (title, description, dueDate, status, priority, userId, categoryId, taskListId, filePath) => {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, due_date, status, priority, user_id, file_path, category_id, task_list_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, dueDate, status, priority, userId, filePath, categoryId, taskListId]  // Corrigido aqui a ordem dos parâmetros
    )
    return result
  },

  getIdFromName: async (table,name) =>{
    const [rows] = await pool.query(`SELECT id FROM ${table} WHERE name = ?`, [name])
    return rows.length ? rows[0].id : null
  }
}