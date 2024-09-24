import { pool } from '../config/db.js'

export const Categories = {
    getAll: async () => {
        const[rows] = await pool.query('SELECT name FROM categories')
        return rows
    }
}

export default Categories;