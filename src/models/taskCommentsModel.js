import { pool } from '../config/db.js';

const TaskComment = {
    getAllComments: async () =>{
        const query = `
            SELECT task_comments.id AS id,
                   tasks.title AS task_title,
                   tasks.description AS task_description,
                   task_comments.comment AS task_comment, 
                   users.name AS user_name
            FROM tasks
            LEFT JOIN task_comments ON task_comments.task_id = tasks.id
            LEFT JOIN users ON task_comments.user_id = users.id;
        `;
        const[rows] = await pool.query(query)
        return rows
    },

    getAllByTaskId: async (taskId) => {
        const [rows] = await pool.query('SELECT * FROM task_comments WHERE task_id = ?', [taskId]);
        return rows;
    },

    addComment: async (task_id, user_id, comment) => {
        const query = 'INSERT INTO task_comments (task_id, user_id, comment) VALUES (?,?,?)'
        const[result] = await pool.query(query, [task_id, user_id, comment])
        return result
    },

    delete: async (id) => {
        const [result] = await pool.query('DELETE FROM task_comments WHERE id = ?', [id]);
        return result;
    },
};

export default TaskComment;