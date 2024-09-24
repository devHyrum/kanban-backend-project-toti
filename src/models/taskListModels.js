import { pool } from '../config/db.js'

export const TaskList = {
    getAll: async () =>{
        const[rows] = await pool.query('SELECT name FROM task_lists')
        return rows
    }
}

export default TaskList;