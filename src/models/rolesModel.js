import { pool } from '../config/db.js'

export const Roles = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT id, role_name FROM roles')
    return rows
  },
}