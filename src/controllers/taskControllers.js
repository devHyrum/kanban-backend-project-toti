import { Task } from '../models/taskModel.js'
import fs from 'fs'
import path from 'path'
import { __dirname } from '../utils/utils.js'

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
    const { title, description, due_date, status, priority, user_id, category_id, task_list_id } = req.body
    const task_file = req.file ? req.file.filename : null

    // Buscar IDs para user_id, category_id e task_list_id com base no nome enviado
    const userId = await Task.getIdFromName('users', user_id)
    const categoryId = await Task.getIdFromName('categories', category_id)
    const taskListId = await Task.getIdFromName('task_lists', task_list_id)

    // Se algum dos IDs não foi encontrado, retornar um erro
    if (!userId || !categoryId || !taskListId) {
      return res.status(400).json({ error: 'Usuário, Categoria ou Lista de Tarefas inválidos' })
    }

    // Criar a nova tarefa com os IDs obtidos
    const newTask = await Task.createTask(
      title, 
      description, 
      due_date, 
      status, 
      priority, 
      userId, 
      categoryId, 
      taskListId, 
      task_file,
    )

    res.json({ message: 'Task criada com sucesso', taskId: { title, description, due_date, status, priority, userId, categoryId, taskListId, task_file, } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar a tarefa' })
  }
}

// // Editar uma tarefa
// export const editTask = async (req, res) => {
//   try {
//     const { title, description, status } = req.body
//     const updatedTask = await Task.updateTask(req.params.id, title, description, status)
//     if (!updatedTask) {
//       return res.status(404).json({ error: 'Tarefa não encontrada' })
//     }
//     res.json(updatedTask)
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao editar a tarefa' })
//   }
// }

// // Excluir uma tarefa
// export const deleteTask = async (req, res) => {
//   try {
//     const deletedTask = await Task.deleteTask(req.params.id)
//     if (!deletedTask) {
//       return res.status(404).json({ error: 'Tarefa não encontrada' })
//     }
//     res.json({ message: 'Tarefa excluída com sucesso' })
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao excluir a tarefa' })
//   }
// }
