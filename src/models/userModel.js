import { pool } from '../config/db.js'

export const User = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT id, name, email, description, job_title, role_id, created_at, user_photo FROM users')
    return rows
  },

  getUser: async (id) => {
    const [usuario] = await pool.execute('SELECT id, name, email, description, job_title, role_id, created_at, user_photo FROM users WHERE id = ?', [id])
    return usuario[0]
  },

  create: async (name, email, description, jobTitle, roleId, user_photo) => {
    const result = await pool.query(
      'INSERT INTO users (name, email, description, job_title, role_id, user_photo) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, description, jobTitle, roleId, user_photo]
    )
    return result
  },
  
  update: async (id, name, email, description, jobTitle, roleId, user_photo) => {
    const result = await pool.query(
      'UPDATE users SET name = ?, email = ?, description = ?, job_title = ?, role_id = ?, user_photo = ? WHERE id = ?',
      [name, email, description, jobTitle, roleId, user_photo, id]
    )
    return result
  },
  
  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
    return result
  },
}
