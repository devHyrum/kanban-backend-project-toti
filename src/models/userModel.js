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
  
  update: async (id, fieldsToUpdate) => {
    // Construa dinamicamente a query e os valores a serem atualizados
    const updates = [];
    const values = [];
  
    for (const field in fieldsToUpdate) {
      updates.push(`${field} = ?`);
      values.push(fieldsToUpdate[field]);
    }
  
    values.push(id); // Adiciona o ID ao final para a condição WHERE
  
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    // console.log('Query gerada:', query);
    // console.log('Valores:', values);
    const result = await pool.query(query, values);
    return result;
  },
  
  delete: async (id) => {
    const result = await pool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    )
    return result
  },
}
