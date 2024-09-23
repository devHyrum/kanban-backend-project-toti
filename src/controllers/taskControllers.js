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
    const updatedTask = await Task.createTask(
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

// Função para gerar a descrição das mudanças
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

    // Buscar IDs para user_id, category_id e task_list_id com base no nome enviado
    const userId = await Task.getIdFromName('users', user_id)
    const categoryId = await Task.getIdFromName('categories', category_id)
    const taskListId = await Task.getIdFromName('task_lists', task_list_id)

    // Se algum dos IDs não foi encontrado, retornar um erro
    if (!userId || !categoryId || !taskListId) {
      return res.status(400).json({ error: 'Usuário, Categoria ou Lista de Tarefas inválidos' })
    }

    // Primeiro, obtenha o usuário para saber a foto atual
    const oldFild = await Task.getTaskById(taskId )
    // Buscar a tarefa antiga para verificar o arquivo antigo
    if (task_file) {

    // Se houver uma nova imagem e o arquivo antigo for diferente, excluir o arquivo antigo
      if (oldFild.file_path && oldFild.file_path !== task_file) {
        const oldFilePath = path.join(taskFilePath, oldFild.file_path)
        
        // Verifique se o arquivo antigo existe e delete-o
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath)
        }
      }
    }

    // Criar a nova tarefa com os IDs obtidos
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
      task_file || oldFild.file_path // Manter o arquivo antigo se não houver um novo
    )

    // Gerar a descrição das mudanças
    const changeDescription = generateChangeDescription(oldFild, { title, description, due_date, status, priority, task_file, user_id, category_id, task_list_id })

    // Se houver mudanças, gravar no histórico
    if (changeDescription) {
      await TaskHistory.recordHistory({
        task_id: taskId ,
        changed_by: myUserId, // ID do usuário autenticado que fez a mudança
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
    // Obtenha o usuário para saber qual foto está associada
    const task = await Task.getTaskById(id)

    // Se houver uma foto associada, exclua-a
    if (task.file_path) {
      const photoPath = path.join(taskFilePath, task.file_path)
  
      // Verifique se o arquivo existe e exclua-o
      if (fs.existsSync(photoPath)) { // verificar oi motivo de não funcioanr
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
