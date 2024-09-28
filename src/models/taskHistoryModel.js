import { pool } from '../config/db.js'

export const TaskHistory = {
  getHistory: async () => {
    const [historical] = await pool.query('SELECT id, task_id, changed_by, change_description, created_at FROM task_history')
      return historical
  },
  getHistoryByTaskId: async (taskId) => {
    const [history] = await pool.query(`
      SELECT 
        th.task_id, 
        u.name AS changed_by_user, 
        th.change_description, 
        th.created_at
      FROM 
        task_history th
      JOIN users u ON th.changed_by = u.id
      WHERE 
        th.task_id = ?
      ORDER BY 
        th.created_at DESC
    `, [taskId])
    return history
  },
  recordHistory: async ({ task_id, changed_by, change_description }) => {
    const result = await pool.query(`
      INSERT INTO task_history (task_id, changed_by, change_description)
      VALUES (?, ?, ?)
    `, [task_id, changed_by, change_description])
    return result
  }
}
