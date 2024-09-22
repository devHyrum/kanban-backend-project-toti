import { pool } from '../config/db.js'

export const User = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT id, name, email, description, job_title, created_at, user_photo FROM users')
    return rows
  },

  getUser: async (id) => {
    const [usuario] = await pool.execute(`
      SELECT 
        users.id, 
        users.name, 
        users.email, 
        users.description, 
        users.job_title, 
        users.created_at, 
        users.user_photo, 
        roles.role_name
      FROM 
        users 
      JOIN 
        roles ON users.role_id = roles.id
      WHERE 
        users.id = ?
    `, [id])
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
