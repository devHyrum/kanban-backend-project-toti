import { Task } from '../models/taskModel.js'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils/utils.js'
import { TaskHistory } from '../models/taskHistoryModel.js'

const taskFilePath = path.join(__dirname, '../uploads/file_path')

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getAllTasks()
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.getTaskById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar a tarefa' })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title, description, due_date, status, priority, user_id, category_id, task_list_id } = req.body;
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'O título da tarefa é obrigatório' });
    }

    const task_file = req.file ? req.file.filename : null;

    const userId = user_id ? await Task.getIdFromName('users', user_id) : null;
    const categoryId = category_id ? await Task.getIdFromName('categories', category_id) : null;
    const taskListId = task_list_id ? await Task.getIdFromName('task_lists', task_list_id) : await Task.getIdFromName('task_lists', 'Para fazer');

    if (!taskListId) {
      return res.status(400).json({ error: 'Lista de Tarefas inválida' });
    }

    const updatedTask = await Task.createTask(
      title,
      description,
      due_date,
      status,
      priority,
      userId,
      categoryId,
      taskListId,
      task_file
    );

    res.json({
      message: 'Task criada com sucesso',
      task: { title, description, due_date, status, priority, userId, categoryId, taskListId, task_file },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a tarefa' });
  }
};


const generateChangeDescription = (oldTask, newTask) => {
  const changes = []

  if (oldTask.title !== newTask.title) {
    changes.push(`Título alterado de '${oldTask.title}' para '${newTask.title}'`)
  }
  if (oldTask.description !== newTask.description) {
    changes.push(`Descrição alterada de '${oldTask.description}' para '${newTask.description}'`)
  }
  if (oldTask.due_date !== newTask.due_date) {
    changes.push(`Data de vencimento alterada de '${oldTask.due_date}' para '${newTask.due_date}'`)
  }
  if (oldTask.status !== newTask.status) {
    changes.push(`Status alterado de '${oldTask.status}' para '${newTask.status}'`)
  }
  if (oldTask.priority !== newTask.priority) {
    changes.push(`Prioridade alterada de '${oldTask.priority}' para '${newTask.priority}'`)
  }
  if (oldTask.file_path !== newTask.file_path) {
    changes.push(`Arquivo alterado de '${oldTask.file_path}' para '${newTask.file_path}'`)
  }
  if (oldTask.user_id !== newTask.user_id) {
    changes.push(`Usuário responsável alterado de '${oldTask.user_id}' para '${newTask.user_id}'`)
  }
  if (oldTask.category_id !== newTask.category_id) {
    changes.push(`Categoria alterada de '${oldTask.category_id}' para '${newTask.category_id}'`)
  }
  if (oldTask.task_list_id !== newTask.task_list_id) {
    changes.push(`Lista de tarea alterada de '${oldTask.task_list_id}' para '${newTask.task_list_id}'`)
  }
  
  return changes.join(', ')
}

export const editTask = async (req, res) => {
  try {
    const { myUserId, taskId  } = req.params
    const { title, description, due_date, status, user_id, priority, category_id, task_list_id } = req.body
    const task_file = req.file ? req.file.filename : null
    console.log(req.params)
    console.log(title, description, due_date, status, user_id, priority, category_id, task_list_id)
    
    const userId = await Task.getIdFromName('users', user_id)
    const categoryId = await Task.getIdFromName('categories', category_id)
    const taskListId = await Task.getIdFromName('task_lists', task_list_id)

    if (!userId || !categoryId || !taskListId) {
      return res.status(400).json({ error: 'Usuário, Categoria ou Lista de Tarefas inválidos' })
    }

    const oldFild = await Task.getTaskById(taskId )
    if (task_file) {

      if (oldFild.file_path && oldFild.file_path !== task_file) {
        const oldFilePath = path.join(taskFilePath, oldFild.file_path)
        
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath)
        }
      }
    }

    const updatedTask = await Task.updateTask(
      taskId,
      title, 
      description, 
      due_date, 
      status, 
      priority, 
      userId, 
      categoryId, 
      taskListId, 
      task_file || oldFild.file_path
    )

    const changeDescription = generateChangeDescription(oldFild, { title, description, due_date, status, priority, task_file, user_id, category_id, task_list_id })

    if (changeDescription) {
      await TaskHistory.recordHistory({
        task_id: taskId ,
        changed_by: myUserId,
        change_description: changeDescription
      })
    }

    if (updatedTask.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarefa não encontrada' })
    }

    res.json({ message: 'Task atualizada com sucesso', taskId: { title, description, due_date, status, priority, userId, categoryId, taskListId, task_file, } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao atualizada a tarefa' })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.getTaskById(id)

    if (task.file_path) {
      const photoPath = path.join(taskFilePath, task.file_path)
  
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath)
      }
    }
    const deletedTask = await Task.deleteTask(req.params.id)
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' })
    }
    res.json({ message: 'Tarefa excluída com sucesso', taskId: id })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir a tarefa' })
  }
}
