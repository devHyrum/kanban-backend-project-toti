import db from '../config/db.js'

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users')
    return rows
  },

  create: async (name, email, description, jobTitle, roleId) => {
    const result = await db.query(
      'INSERT INTO users (name, email, description, job_title, role_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, description, jobTitle, roleId]
    )
    return result
  }
}

module.exports = User
